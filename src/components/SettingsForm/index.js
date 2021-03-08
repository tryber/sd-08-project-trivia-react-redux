import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../trivia.png';
import './styles.css';

export default class SettingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'category1',
      difficulty: 'difficulty1',
      type: 'type1',
    };

    this.categories = ['category1', 'category2', 'category3'];
    this.difficulties = ['difficulty1', 'difficulty2', 'difficulty3'];
    this.types = ['type1', 'type2', 'type3'];
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { category, difficulty, type } = this.state;
    return (
      <form>
        <img src={ logo } className="App-logo" alt="logo" />
        <h1 className="group-name">TWENTY-FIVE</h1>
        <h2 data-testid="settings-title">Configurações</h2>
        <div className="selects">
          <label htmlFor="category-select">
            Categoria
            <select
              name="category"
              value={ category }
              onChange={ this.handleChange }
            >
              {this.categories.map((cat, index) => (
                <option key={ index } value={ cat }>{cat}</option>
              ))}
            </select>
          </label>

          <label htmlFor="difficulty-select">
            Dificuldade
            <select
              name="difficulty"
              value={ difficulty }
              onChange={ this.handleChange }
            >
              {this.difficulties.map((diff, index) => (
                <option key={ index } value={ diff }>{diff}</option>
              ))}
            </select>
          </label>

          <label htmlFor="type-select">
            Tipo
            <select
              name="type"
              value={ type }
              onChange={ this.handleChange }
            >
              {this.types.map((typ, index) => (
                <option key={ index } value={ typ }>{typ}</option>
              ))}
            </select>
          </label>
        </div>
        <Link to="/" className="home-btn" data-testid="btn-go-home">Voltar</Link>
      </form>
    );
  }
}
