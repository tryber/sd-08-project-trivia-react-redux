import React, { Component } from 'react';
import { getCategories } from '../services/triviaApi';

import PrimaryButton from '../components/Buttons/PrimaryButton';

import styles from '../styles/pages/Settings.module.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: 'Animals',
      difficulty: 'easy',
      questionType: 'multiple',
    };

    this.difficultyLevels = ['Easy', 'Medium', 'Hard'];
    this.questionTypes = ['Multiple', 'Boolean'];

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    getCategories().then((results) => this.setState({
      categories: results.trivia_categories,
    }));
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  renderCategories(category) {
    const { categories } = this.state;
    return (
      <select
        name="category"
        onChange={ this.handleChange }
        value={ category }
      >
        { categories
          .sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
          .map(({ name, id }) => (
            <option value={ name } key={ id }>{ name }</option>
          ))}
      </select>
    );
  }

  renderDifficulties(difficulty) {
    return (
      <select
        name="difficulty"
        onChange={ this.handleChange }
        value={ difficulty }
      >
        { this.difficultyLevels
          .map((currentDifficulty, index) => (
            <option
              value={ currentDifficulty.toLowerCase() }
              key={ index }
            >
              { currentDifficulty }
            </option>
          ))}
      </select>
    );
  }

  renderQuestionTypes(questionType) {
    return (
      <select
        name="questionType"
        onChange={ this.handleChange }
        value={ questionType }
      >
        { this.questionTypes
          .map((question, index) => (
            <option
              value={ question.toLowerCase() }
              key={ index }
            >
              { question }
            </option>
          ))}
      </select>
    );
  }

  render() {
    const { category, difficulty, questionType } = this.state;
    return (
      <div className={ styles.settingsContainer }>
        <div className={ styles.settings }>
          <div className={ styles.settingsHeader }>
            <h1 className={ styles.title } data-testid="settings-title">Settings</h1>
          </div>
          <div className={ styles.settingsBody }>
            <form className={ styles.settingsForm }>
              { this.renderCategories(category) }
              { this.renderDifficulties(difficulty) }
              { this.renderQuestionTypes(questionType) }
              <PrimaryButton>Salvar</PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
