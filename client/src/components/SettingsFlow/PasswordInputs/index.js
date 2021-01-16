import React, { Component } from "react";
import AppButton from "../../AppButton";
import AppInput from "../../AppInput";

class PasswordInputs extends Component {
  componentDidMount() {
    document.getElementById(`change-password-field`).focus();
  }

  styles = {
    buttonsContainer: {
      display: `flex`,
      flexDirection: `row-reverse`,
      flexWrap: `wrap-reverse`,
      justifyContent: `space-around`,
      marginTop: `50px`,
    },
  };

  render() {
    return (
      <div>
        <form onSubmit={event => this.props.onSubmit(event)}>
          <p>{this.props.title}</p>
          {this.props.inputs.map((current, index) => (
            <div key={index}>
              {index > 0 && <p>{this.props.subtitle}</p>}
              <AppInput
                fieldName={current.fieldName}
                handleChange={this.props.handleChange}
                id={index === 0 && `change-password-field`}
                type={`password`}
                value={current.value}
              />
            </div>
          ))}
          <div style={this.styles.buttonsContainer}>
            <AppButton id={`password-button`} type={`submit`} width={`170px`}>
              {this.props.buttonName}
            </AppButton>
            {this.props.cancel && (
              <AppButton
                id={`password-cancel-button`}
                onClick={this.props.cancel}
                type={`button`}
                width={`170px`}
              >
                Cancel
              </AppButton>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default PasswordInputs;
