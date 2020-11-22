import React, { Component } from "react";
import IndexPortrait from "../components/IndexPortrait";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageName: ``,
      imagePath: `1`,
    };
  }

  handleChange = (event, stateKey) => {
    this.setState({ [stateKey]: event.target.value });
  };

  handleClick = () => {
    this.setState({ imagePath: this.state.imageName });
    this.setState({ imageName: `` });
  };

  render() {
    return (
      <div>
        <h1>
          Welcome
          {this.props.loggedIn ? ` ${this.props.currentUser.username}` : null}!
        </h1>
        {this.props.loggedIn ? (
          <div>
            <div style={{ display: `flex`, justifyContent: `space-between` }}>
              {this.props.captain ? (
                <IndexPortrait
                  title={`Captain`}
                  image={this.props.captain.image.url}
                  name={this.props.captain.name}
                />
              ) : null}
              {this.props.recruit ? (
                <IndexPortrait
                  title={`Latest Recruit`}
                  image={this.props.recruit.image.url}
                  name={this.props.recruit.name}
                />
              ) : (
                <IndexPortrait title={false} />
              )}
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              vitae ultricies sapien. Pellentesque iaculis vel nisl malesuada
              aliquet. Duis porttitor posuere fermentum. Curabitur venenatis
              ornare hendrerit. Quisque nec lectus rhoncus, tincidunt metus sit
              amet, efficitur diam. Donec pretium enim non arcu fringilla
              semper. Fusce efficitur laoreet velit nec vehicula. Phasellus ut
              aliquam tortor, iaculis pulvinar lectus. Morbi est purus, ultrices
              et diam ut, suscipit laoreet est. Nulla pretium hendrerit nulla,
              id ultrices nisi consectetur at. Integer vel elementum justo. Sed
              eleifend ex quam, sit amet interdum libero commodo sit amet. Nam
              suscipit interdum neque, a pellentesque sapien tempor vel. Proin
              sit amet rhoncus tortor. Mauris elementum massa nec diam maximus
              porttitor. Nam id erat dapibus, ultricies lectus non, pretium
              diam. Curabitur eget massa nisl. Nunc id leo leo. Aenean ultrices
              magna quis nulla gravida, nec suscipit massa tristique. Mauris id
              ornare urna. Cras imperdiet turpis justo, varius egestas nunc
              tincidunt sed. Integer dictum posuere tellus a luctus. Nulla id
              dolor molestie,
            </p>{" "}
            <p>
              condimentum enim vitae, fringilla diam. Sed vitae luctus velit,
              faucibus consectetur diam. Nunc ac justo at dolor gravida tempor.
              Fusce sed ex lectus. Vestibulum bibendum scelerisque nisl non
              accumsan. Pellentesque habitant morbi tristique senectus et netus
              et malesuada fames ac turpis egestas. Integer ultricies sem sem.
              Etiam faucibus libero vel risus aliquet pellentesque. Nulla auctor
              mi id magna aliquet luctus. Integer in malesuada ante, in egestas
              leo. Donec accumsan, nulla ac vehicula vulputate, metus nulla
              sodales turpis, in laoreet eros lorem in nisl. Cras in nisl
              facilisis, varius ligula eget, malesuada erat. Proin eget ligula
              efficitur, maximus eros id, iaculis tortor. Sed lacinia, ipsum sit
              amet ornare vehicula, massa risus rhoncus nibh, in ullamcorper
              augue lorem eget augue. Phasellus finibus laoreet sem, a varius
              nisi varius in. Praesent sed tincidunt libero. Quisque eget
              suscipit purus. Morbi elementum ornare ex
            </p>
            <p>
              ultricies tempus. Donec accumsan quam id risus pulvinar, sit amet
              blandit nisl efficitur. Phasellus eget laoreet est. Nullam diam
              sapien, finibus ut varius ac, faucibus id nibh. Phasellus vitae
              magna ornare, feugiat eros ac, ornare mauris. Nulla mauris purus,
              lobortis sit amet enim pellentesque, mollis imperdiet ligula. Ut
              quis mi tempus, facilisis tortor at, convallis justo. Aliquam
              bibendum dolor nec tortor cursus euismod. Ut semper neque vitae
              nibh imperdiet auctor. Quisque ac erat finibus, bibendum est
              sagittis, suscipit risus. Nunc quis tortor vulputate turpis
              bibendum egestas a blandit sem. Suspendisse eget lacus id sapien
              ullamcorper dapibus. Praesent arcu augue, volutpat{" "}
            </p>
            <p>
              quis nunc eu, finibus bibendum metus. In faucibus, dui vitae
              varius pellentesque, justo orci pretium nisl, ac pharetra est ex
              sed lectus. Cras ullamcorper convallis odio, id gravida quam
              feugiat vitae. Aenean lectus ante, volutpat vel placerat ut,
              placerat id lectus. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Suspendisse
              volutpat finibus nibh, sed vehicula sapien vestibulum in. Donec
              ante est, elementum in purus eu, dapibus tincidunt ligula. Donec
              lacinia pellentesque erat, vitae congue tortor viverra a. Maecenas
              sed dui eu lacus aliquam facilisis. Donec nec rhoncus felis,
              vestibulum porta metus. Donec pharetra justo at felis condimentum
              accumsan.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Index;
