import React, {useMemo, useState} from 'react';

const {
  View,
  PanResponder,
  Animated,
  StyleSheet,
  Text,
} = require('react-native');

var images = [
  {id: 'like', img: 'http://i.imgur.com/LwCYmcM.gif'},
  {id: 'love', img: 'http://i.imgur.com/k5jMsaH.gif'},
  {id: 'haha', img: 'http://i.imgur.com/f93vCxM.gif'},
  {id: 'yay', img: 'http://i.imgur.com/a44ke8c.gif'},
  {id: 'wow', img: 'http://i.imgur.com/9xTkN93.gif'},
  {id: 'sad', img: 'http://i.imgur.com/tFOrN5d.gif'},
  {id: 'angry', img: 'http://i.imgur.com/1MgcQg0.gif'},
];

const FaceBookReaction = () => {
  const initialState = {
    selected: '',
    open: false,
  };

  var _imgLayouts = {};
  var _imageAnimations = {};
  var _hoveredImg = '';
  var _scaleAnimation = new Animated.Value(0);
  const [state, setState] = useState(initialState);

  useMemo(() => {
    console.log('>>>>>>>>useMemo');
    images.forEach(img => {
      _imageAnimations[img.id] = {
        position: new Animated.Value(55),
        scale: new Animated.Value(1),
      };
    });
  }, []);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: open,
        onPanResponderMove: (evt, gestureState) => {
          var hoveredImg = getHoveredImg(Math.ceil(evt.nativeEvent.locationX));

          if (hoveredImg && _hoveredImg !== hoveredImg) {
            animateSelected(_imageAnimations[hoveredImg]);
          }
          if (_hoveredImg !== hoveredImg && _hoveredImg) {
            animateFromSelect(_imageAnimations[_hoveredImg]);
          }

          _hoveredImg = hoveredImg;
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (_hoveredImg) {
            animateFromSelect(
              _imageAnimations[_hoveredImg],
              close.bind(this, afterClose),
            );
          } else {
            close(afterClose);
          }
        },
      }),
    [],
  );

  function afterClose() {
    if (_hoveredImg) {
      setState({
        selected: _hoveredImg,
      });
    }

    _hoveredImg = '';
  }

  function animateSelected(imgAnimations) {
    Animated.parallel([
      Animated.timing(imgAnimations.position, {
        duration: 150,
        toValue: -30,
      }),
      Animated.timing(imgAnimations.scale, {
        duration: 150,
        toValue: 1.8,
      }),
    ]).start();
  }

  function animateFromSelect(imgAnimations, cb) {
    Animated.parallel([
      Animated.timing(imgAnimations.position, {
        duration: 50,
        toValue: 0,
      }),
      Animated.timing(imgAnimations.scale, {
        duration: 50,
        toValue: 1,
      }),
    ]).start(cb);
  }

  function getHoveredImg(x) {
    return Object.keys(_imgLayouts).find(key => {
      return x >= _imgLayouts[key].left && x <= _imgLayouts[key].right;
    });
  }

  function getImageAnimationArray(toValue) {
    return images.map(img => {
      return Animated.timing(_imageAnimations[img.id].position, {
        duration: 200,
        toValue: toValue,
      });
    });
  }

  function open() {
    Animated.parallel([
      Animated.timing(_scaleAnimation, {
        duration: 100,
        toValue: 1,
      }),
      Animated.stagger(50, getImageAnimationArray(0)),
    ]).start(() => setState({open: true}));
  }

  function close(cb) {
    setState({open: false}, () => {
      Animated.stagger(100, [
        Animated.parallel(getImageAnimationArray(55, 0).reverse()),
        Animated.timing(_scaleAnimation, {
          duration: 100,
          toValue: 0,
        }),
      ]).start(cb);
    });
  }
  function handleLayoutPosition(img, position) {
    _imgLayouts[img] = {
      left: position.nativeEvent.layout.x,
      right: position.nativeEvent.layout.x + position.nativeEvent.layout.width,
    };
  }
  function getImages() {
    try {
      return images.map(img => {
        return (
          <Animated.Image
            onLayout={handleLayoutPosition.bind(this, img.id)}
            key={img.id}
            source={{uri: img.img}}
            style={[
              styles.img,
              {
                transform: [
                  {scale: _imageAnimations[img.id].scale},
                  {translateY: _imageAnimations[img.id].position},
                ],
              },
            ]}
          />
        );
      });
    } catch (err) {
      console.log(err);
    }
  }
  function getLikeContainerStyle() {
    return {
      transform: [{scaleY: _scaleAnimation}],
      overflow: state.open ? 'visible' : 'hidden',
    };
  }

  return (
    <View style={styles.container}>
      <View style={styles.center} {...panResponder.panHandlers}>
        <Text>Like</Text>
        <Animated.View style={[styles.likeContainer, getLikeContainerStyle()]}>
          <View style={styles.borderContainer} />
          <View style={styles.imgContainer}>{getImages()}</View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    position: 'absolute',
    left: 50,
    top: 300,
  },
  likeContainer: {
    position: 'absolute',
    left: -10,
    top: -30,
    padding: 5,
    flex: 1,
    backgroundColor: '#FFF',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 20,
  },
  borderContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 20,
  },
  imgContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  img: {
    marginLeft: 5,
    marginRight: 5,
    width: 30,
    height: 30,
    overflow: 'visible',
  },
});

export default FaceBookReaction;
