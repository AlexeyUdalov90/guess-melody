import React, {PureComponent} from "react";
import PropTypes from "prop-types";


class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    const {question} = this.props;
    const {answers} = question;

    this.state = {
      userAnswer: new Array(answers.length).fill(false),
    };
  }

  render() {
    const {step, question, onAnswer, renderPlayer} = this.props;
    const {
      answers,
      genre,
    } = question;

    return <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks" onSubmit={(evt) => {
        evt.preventDefault();
        onAnswer(this.state.userAnswer);
      }}>
        {answers.map((it, i) => <div className="track" key={`${step}-answer-${i}`}>
          {renderPlayer(it, i)}
          <div className="game__answer">
            <input
              checked={this.state.userAnswer[i]}
              className="game__input visually-hidden"
              type="checkbox"
              name="answer"
              value={`answer-${i}`}
              id={`answer-${i}`}
              onChange={() => {
                const userAnswer = [...this.state.userAnswer];
                userAnswer[i] = !userAnswer[i];
                this.setState({userAnswer});
              }}
            />
            <label className="game__check" htmlFor={`answer-${i}`}>
              Отметить
            </label>
          </div>
        </div>)}

        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>;
  }
}


GenreQuestionScreen.propTypes = {
  step: PropTypes.number,
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf([`rock`, `jazz`, `blues`]).isRequired,
    })).isRequired,
    genre: PropTypes.oneOf([`rock`, `jazz`, `blues`]).isRequired,
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
};


export default GenreQuestionScreen;