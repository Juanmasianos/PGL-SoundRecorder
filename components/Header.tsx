import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function Header() {
	return (
		<View style={styles.container}>
			<Image source={require('../assets/logo.png')} style={styles.headerLogo} />
			<Text style={styles.headerText}>RGB Recorder</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 15,
		flexDirection: 'row',
		backgroundColor: 'black',
	},
	headerText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 50,
		marginLeft: 10,
	},
	headerLogo: {
		width: 80,
		height: 80,
		marginTop: 25,
		marginLeft: 10,
	},
})