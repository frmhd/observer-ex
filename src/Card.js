import React, { useRef, useEffect, useReducer } from 'react';

const Card = ({ children }) => {
  let cardRef = useRef(null);

  const setVisibile = () => ({ type: 'setVisibile' })
  const setHidden = () => ({ type: 'setHidden' })
  const setinitialBlockHeight = (payload) => ({ type: 'setinitialBlockHeight', payload })

  const initialState = {
    isVisible: true,
    blockHeight: 0,
    initialBlockHeight: 0,
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'setVisibile':
        return { ...state, isVisible: true, blockHeight: 0 };
      case 'setHidden':
        return { ...state, isVisible: false, blockHeight: state.initialBlockHeight };
      case 'setinitialBlockHeight':
        return { ...state, initialBlockHeight: action.payload };
      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '100px 0px 100px 0px',
      threshold: 0
    };

    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) return dispatch(setVisibile());
      return dispatch(setHidden());
    };

    const observer = new IntersectionObserver(callback, observerOptions);
    observer.observe(cardRef.current);
    dispatch(setinitialBlockHeight(cardRef.current.clientHeight));
  }, []);

  return (
    <div
      style={{width: '100%', display: 'flex', flexWrap: 'wrap', paddingBottom: `${state.blockHeight}px`}}
      ref={cardRef}>
      {state.isVisible ? children : null}
    </div>
  );

};

export default Card;
