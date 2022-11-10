import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { keyframes, stagger } from "popmotion";

const Count = 5;
const Duration = 4000;
const initialPhase = { scale: 0, opacity: 1 };
const constracturAnimations = () =>
  [...Array(Count).keys()].map(() => initialPhase);

class CameraRader extends React.Component {
  state = {
    animation: constracturAnimations(),
  };

  animationCircle = () => {
    const actions = Array(Count).fill(
      keyframes({
        values: [initialPhase, { scale: 2, opacity: 0 }],
        duration: Duration,
        loop: Infinity,
        yoyo: Infinity,
      })
    );

    stagger(actions, Duration / Count).start((animations) => {
      this.setState({ animations });
    });
  };

  componentDidMount() {
    this.animationCircle();
  }

  render() {
    return (
      <View style={styles(this.props).container}>
        {this.state.animations?.map(({ opacity, scale }, index) => {
          return (
            <Animated.View
              key={index}
              style={[
                styles(this.props).circle,
                {
                  transform: [{ scale }],
                  opacity,
                },
              ]}
            />
          );
        })}
        <Text>{this.props.isSafe ? "No camera found" : "Found camera"}</Text>
      </View>
    );
  }
}
const styles = ({ isSafe }) =>
  StyleSheet.create({
    circle: {
      backgroundColor: isSafe ? "green" : "red",
      width: 200,
      height: 200,
      borderRadius: 100,
      position: "absolute",
    },
    container: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
export default CameraRader;
