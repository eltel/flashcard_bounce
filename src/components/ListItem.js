import React, { Component } from 'react';
import { Text,
  TouchableWithoutFeedback,
  View,
  NativeModules,
  LayoutAnimation
 } from 'react-native';
 import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true);

class ListItem extends Component {
  componentDidUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    const { library, expanded } = this.props;
    if (expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1, paddingLeft: 25, paddingRight: 25 }}>
            {library.item.description}
          </Text>
        </CardSection>
      );
    }
  }
  render() {
    // console.log('props', this.props);
    const { titleStyle } = styles;
    const { id, title } = this.props.library.item;
    // console.log(this.props);
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(id)}
      >
        <View>
          <CardSection>
           <Text style={titleStyle}>
             {title}
           </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 28,
    paddingLeft: 15
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.item.id;
  return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
