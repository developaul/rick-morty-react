import React from 'react'
import { connect } from 'react-redux'

import { removeCharacterAction } from '../../redux/charsDuck';

import Card from '../card/Card'

import styles from './home.module.css'

function Home({ chars, removeCharacterAction }) {

	function renderCharacter() {
		const [char] = chars;
		return (
			<Card leftClick={nextCharacter} {...char} />
		)
	}

	function nextCharacter() {
		removeCharacterAction()
	}

	return (
		<div className={styles.container}>
			<h2>Personajes de Rick y Morty</h2>
			<div>
				{renderCharacter()}
			</div>
		</div>
	)
}

// MapStateToProps, mapea el state y lo que retorna lo recibe el componente como props
function mapState(state) {
	return {
		chars: state.characters.array
	}
}

// CONNECT SE USA DE 2 FORMAS DISTINTAS
// 1. PERDIR DATOS QUE YA TIENE EL REDUCER
// 2. DESPACHAR ACCIONES
// como primer argumento recibe el mapStateToProps, como segundo argumento recibe un objeto con las diferentes acciones 
// que require dispachar el component y se los pasa como props
export default connect(mapState, { removeCharacterAction })(Home)