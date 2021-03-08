import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories as getCategoriesAction,
  selectCategory as selectCategoryAction,
  selectType as selectTypeAction,
  selectDifficulty as selectDifficultyAction } from '../actions/game';

class Settings extends React.Component {
  constructor() {
    super();
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  change({ target }) {
    const { selectCategory, selectDifficulty, selectType } = this.props;
    const select = { category: selectCategory,
      difficulty: selectDifficulty,
      type: selectType };

    select[target.id](target.value);
  }

  render() {
    const { categories } = this.props;
    return (
      <section>
        <h1 data-testid="settings-title">Settings</h1>
        <label htmlFor="category">
          Category
          <select onChange={ this.change } id="category">
            <option key="0" value="0">Any Category</option>
            { categories.map((category) => (
              <option key={ category.id } value={ category.id }>{ category.name }</option>
            )) }
          </select>
        </label>
        <label htmlFor="difficulty">
          Difficulty
          <select id="difficulty" onChange={ this.change }>
            <option value="All">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label htmlFor="type">
          Type
          <select id="type" onChange={ this.change }>
            <option value="All">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </label>

        <Link to="/">Voltar</Link>
      </section>
    );
  }
}

Settings.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCategories: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  selectType: PropTypes.func.isRequired,
  selectDifficulty: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.game.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesAction()),
  selectCategory: (payload) => dispatch(selectCategoryAction(payload)),
  selectType: (payload) => dispatch(selectTypeAction(payload)),
  selectDifficulty: (payload) => dispatch(selectDifficultyAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
