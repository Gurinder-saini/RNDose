import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Dimensions } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { scanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

let rotateListener = null;

export default function QRScanner({
	onScan = () => { },
}) {
	const AimingBorderSize = useRef(null);
	const isFind = useRef(false);
	const [qrBorders, setQrBorders] = useState([]);
	const devices = useCameraDevices();
	const device = devices.back;



	const barCodesHandler = (detectedBarcodes, frame) => {

		if (!!isFind?.current) {
			return null;
		}

		if (!detectedBarcodes?.length) {
			setQrBorders([]);
			return null;
		}


		// 1) отфильтрую одинаковые
		const codeFiltered = detectedBarcodes.filter((value, index, self) => self.findIndex((el, i) => el.content.data === value.content.data) === index);


		// 2) нарисую им рамки
		const bordersStyles = [];
		const win = Dimensions.get('window');
		const isPortal = win.height > win.width;
		const rH = win.height / (isPortal ? Math.max(frame.height, frame.width) : Math.min(frame.height, frame.width));
		const rW = win.width / (isPortal ? Math.min(frame.height, frame.width) : Math.max(frame.height, frame.width));

		for (let i = 0; i < codeFiltered.length; i++) {
			const b = codeFiltered[i];

			bordersStyles.push({
				inside: false,
				boundingBox: {
					bottom: b.boundingBox.bottom * rH,
					left: b.boundingBox.left * rW,
					right: b.boundingBox.right * rW,
					top: b.boundingBox.top * rH,
				},
				style: {
					borderWidth: 1,
					borderColor: 'red',
					position: 'absolute',
					top: (Math.min(b.cornerPoints[0].y, b.cornerPoints[1].y)) * rH,  //  b.cornerPoints[1].y
					left: (Math.min(b.cornerPoints[0].x, b.cornerPoints[3].x)) * rW, // b.cornerPoints[3].x
					height: (b.cornerPoints[3].y - b.cornerPoints[0].y) * rH,
					width: (b.cornerPoints[1].x - b.cornerPoints[0].x) * rW,
				},
			});

			if (isInside(bordersStyles[bordersStyles.length - 1])) {
				bordersStyles[bordersStyles.length - 1].inside = true;
				bordersStyles[bordersStyles.length - 1].style.borderColor = '#00FF00';
				bordersStyles[bordersStyles.length - 1].style.borderWidth = 2;
			}
		}
		setQrBorders(bordersStyles);



		// 3) отправлю в коллбек
		const insideIndex = bordersStyles.findIndex(el => el.inside);
		if (insideIndex !== -1) {
			isFind.current = true;
			onScan(codeFiltered[insideIndex].displayValue.toLowerCase().trim());
		}

	};



	const isInside = (oneBord) => {
		const ab = AimingBorderSize.current;
		const bb = oneBord.boundingBox;

		if (bb.top > ab.yt && bb.bottom < ab.yb && bb.left > ab.xl && bb.right < ab.xr) {
			return true;
		}

		return false;
	};



	const frameProcessor = useFrameProcessor((frame) => {
		'worklet';
		const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
		runOnJS(barCodesHandler)(detectedBarcodes, frame);
	}, []);



	return (
		<View style={{ flex: 1 }}>
			{device != null && (
				<>
					<Camera
						style={StyleSheet.absoluteFill}
						device={device}
						isActive={true}
						frameProcessor={frameProcessor}
						frameProcessorFps={5}
					/>

					{/* Зеленая рамка для прицеливания */}
					<FrameForAiming getAimingBorderPos={(b) => (AimingBorderSize.current = b)} />

					{/* Подсвечу все что распозналось */}
					{!!qrBorders?.length && (
						qrBorders.map((b, k) => (<View key={k} style={b.style} />))
					)}
				</>
			)}
		</View>
	);
}






export function FrameForAiming({
	getAimingBorderPos = () => { },
}) {
	const [H, setH] = React.useState(0);
	const maxLayouts = 5;
	const curLayouts = useRef(0);



	useEffect(() => {
		rotateListener = Dimensions.addEventListener('change', () => {
			curLayouts.current = 0;
			setH(0);
		});

		return () => {
			rotateListener?.remove();
		};
	});


	return (
		<View style={ST_.ScreenWrap}>
			<View
				style={[ST_.wrap, { height: H }]}
				onLayout={(e) => {
					if (curLayouts.current < maxLayouts) {
						const l = e.nativeEvent.layout;
						l.height = l.width;

						setH(parseInt(l.width, 10));

						getAimingBorderPos({
							xl: parseInt(l.x, 10),
							xr: parseInt(l.x + l.width, 10),
							yt: parseInt(l.y, 10),
							yb: parseInt(l.y + l.height, 10),
						});

						curLayouts.current++;
					}
				}}
			>
				<View style={ST_.tlb} />
				<View style={ST_.trb} />
				<View style={ST_.blb} />
				<View style={ST_.brb} />
			</View>
		</View>
	);
}


const BorderWidth = 1;
const BorderStyle = {
	position: 'absolute',
	width: '35%',
	height: '35%',
	borderColor: '#00FF00',
};
const ST_ = {
	ScreenWrap: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	wrap: {
		width: '45%',
	},
	tlb: {
		top: 0,
		left: 0,
		borderTopWidth: BorderWidth,
		borderLeftWidth: BorderWidth,
		...BorderStyle,
	},
	trb: {
		top: 0,
		right: 0,
		borderTopWidth: BorderWidth,
		borderRightWidth: BorderWidth,
		...BorderStyle,
	},
	blb: {
		bottom: 0,
		left: 0,
		borderBottomWidth: BorderWidth,
		borderLeftWidth: BorderWidth,
		...BorderStyle,
	},
	brb: {
		bottom: 0,
		right: 0,
		borderBottomWidth: BorderWidth,
		borderRightWidth: BorderWidth,
		...BorderStyle,
	},
};
