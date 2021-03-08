import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import categoriesAPI from '../services/listOfCategoriesAPI';
import { saveConfig } from '../redux/actions';

class Config extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveConfig = this.handleSaveConfig.bind(this);
    this.state = {
      categories: [],
      category: '',
      difficulty: '',
      type: '',
      amount: 5,
    };
  }

  componentDidMount() {
    categoriesAPI().then((result) => {
      const categories = [{ id: 0, name: 'Any Category' },
        ...result.trivia_categories];
      this.setState(() => ({
        categories,
      }));
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  }

  handleSaveConfig() {
    const { saveConfigAction, show } = this.props;
    const { category, difficulty, type, amount } = this.state;
    const MIN_QUESTIONS = 5;
    const MAX_QUESTIONS = 50;
    let tempAmount = amount;
    if (tempAmount === '' || +tempAmount <= MIN_QUESTIONS) tempAmount = MIN_QUESTIONS;
    if (+tempAmount >= MAX_QUESTIONS) tempAmount = MAX_QUESTIONS;
    saveConfigAction({ category, difficulty, type, amount: tempAmount });
    show();
  }

  render() {
    const { categories, category, difficulty, type, amount } = this.state;
    return (
      <>
        <h1 data-testid="settings-title">Configurações</h1>
        <label htmlFor="category">
          Categoria
          <select
            name="category"
            id="category"
            onChange={ this.handleChange }
            value={ category }
          >
            { categories.map((cat, index) => (
              <option value={ cat.id } key={ index }>
                { cat.name }
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="difficulty">
          Dificuldade
          <select
            name="difficulty"
            id="difficulty"
            onChange={ this.handleChange }
            value={ difficulty }
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label htmlFor="type">
          Tipo
          <select
            name="type"
            id="type"
            onChange={ this.handleChange }
            value={ type }
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </label>

        <label htmlFor="amount">
          Quantidade de Perguntas
          <input
            type="number"
            min="5"
            max="50"
            name="amount"
            id="amount"
            value={ amount }
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          onClick={ this.handleSaveConfig }
          className="cool saveConfig"
        >
          SALVAR
        </button>
      </>
    );
  }
}

Config.propTypes = {
  saveConfigAction: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  saveConfigAction: (obj) => dispatch(saveConfig(obj)),
});

export default connect(null, mapDispatchToProps)(Config);
