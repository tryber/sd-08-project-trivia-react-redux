import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  getCategoriesAPI,
  selectCategory as selectCategoryAction,
  selectDifficulty as selectDifficultyAction,
  selectType as selectTypeAction,
} from '../_redux/action';

const difficulty = [
  { id: '', name: 'Any Difficulty' },
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
];

const types = [
  { id: '', name: 'Any Difficulty' },
  { id: 'multiple', name: 'Multiple Choice' },
  { id: 'boolean', name: 'True or False' },
];

class Config extends Component {
  constructor() {
    super();
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.onSelectDifficulty = this.onSelectDifficulty.bind(this);
    this.onSelectType = this.onSelectType.bind(this);
  }

  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  onSelectCategory(e) {
    const { selectCategory } = this.props;
    selectCategory(e.target.value);
  }

  onSelectDifficulty(e) {
    const { selectDifficulty } = this.props;
    selectDifficulty(e.target.value);
  }

  onSelectType(e) {
    const { selectType } = this.props;
    selectType(e.target.value);
  }

  render() {
    const { categories, history } = this.props;
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <label htmlFor="categories">
          Select Category:
          <select id="categories" onChange={ this.onSelectCategory }>
            {categories.map((category, i) => (
              <option
                key={ i }
                value={ category.id }
              >
                {category.name}
              </option>))}
          </select>
        </label>
        <label htmlFor="difficulty">
          Select Difficulty:
          <select id="difficulty" onChange={ this.onSelectDifficulty }>
            {difficulty.map((dif, i) => (
              <option
                key={ i }
                value={ dif.id }
              >
                {dif.name}
              </option>))}
          </select>
        </label>
        <label htmlFor="type">
          Select Type:
          <select id="type" onChange={ this.onSelectType }>
            {types.map((type, i) => (
              <option
                key={ i }
                value={ type.id }
              >
                {type.name}
              </option>))}
          </select>
        </label>
        <button type="button" onClick={ () => history.push('/') }>Voltar</button>
        {/* <div>
          <Link to="/">Voltar</Link>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.trivia.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesAPI()),
  selectCategory: (category) => dispatch(selectCategoryAction(category)),
  selectDifficulty: (dif) => dispatch(selectDifficultyAction(dif)),
  selectType: (type) => dispatch(selectTypeAction(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Config);

Config.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCategories: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  selectCategory: PropTypes.func.isRequired,
  selectDifficulty: PropTypes.func.isRequired,
  selectType: PropTypes.func.isRequired,
};
