import React,{useEffect} from "react";
import useWebAnimations from "@wellyshen/use-web-animations";
import "./style.css"

export const RedQueen = () => {

  const sceneryFrames =   [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }   
  ];
  
  const sceneryTimingBackground = {
    duration: 36000,
    iterations: Infinity
  };
  
  const sceneryTimingForeground = {
    duration: 12000,
    iterations: Infinity
  };
  
  const foreground1Ref = useWebAnimations({
  keyframes: sceneryFrames,
  animationOptions: sceneryTimingForeground
  })

  const foreground2Ref = useWebAnimations({
  keyframes: sceneryFrames,
  animationOptions: sceneryTimingForeground
  })

  const background1Ref = useWebAnimations({
  keyframes: sceneryFrames,
  animationOptions: sceneryTimingBackground
  })

  const background2Ref = useWebAnimations({
  keyframes: sceneryFrames,
  animationOptions: sceneryTimingBackground
  })

  const spriteFrames = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-100%)' }   
  ];

  const redQueen_alice = useWebAnimations({
    keyframes: spriteFrames, 
    animationOptions: {
      easing: 'steps(7, end)',
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: Infinity
    }
  });

  let sceneries = [
		foreground1Ref,
		foreground2Ref,
		background1Ref,
		background2Ref,
	];


  let adjustBackgroundPlayback = () => {

		const redQueen_alice_play_backrate = redQueen_alice.getAnimation().playbackRate;

		if (redQueen_alice_play_backrate < 0.8) {
			sceneries.forEach(({ getAnimation }) => {				
				getAnimation().updatePlaybackRate( (redQueen_alice_play_backrate/2) * -1 );
			});
		} else if (redQueen_alice_play_backrate > 1.2) {
			sceneries.forEach(({ getAnimation }) => {
				getAnimation().updatePlaybackRate( redQueen_alice_play_backrate/2 );
			});
		} else {
			sceneries.forEach(({ getAnimation }) => {
				getAnimation().updatePlaybackRate(0);
			});
		}
	};

	useEffect(() => {
		
		background1Ref.getAnimation().currentTime = background1Ref.getAnimation().effect.getTiming().duration / 2;
		foreground1Ref.getAnimation().currentTime = foreground1Ref.getAnimation().effect.getTiming().duration / 2;

		adjustBackgroundPlayback();

		setInterval(() => { 

			const redQueen_alice_animation = redQueen_alice.getAnimation();
		
			if (redQueen_alice_animation.playbackRate > .4) {
				const newPlayback = redQueen_alice_animation.playbackRate * .9;
				redQueen_alice_animation.updatePlaybackRate(newPlayback);
			} 
			adjustBackgroundPlayback();

		}, 3000);

	})


	const goFaster = () => {
		const redQueen_alice_animation = redQueen_alice.getAnimation();
		const newPlayback = redQueen_alice_animation.playbackRate * 1.1;
		redQueen_alice_animation.updatePlaybackRate(newPlayback);
		adjustBackgroundPlayback();
	}
    
  return (
    <div onClick={goFaster} className="wrapper">
      <div className="sky"></div>
      <div className="earth">
        <div id="red-queen_and_alice" >
          <img
            id="red-queen_and_alice_sprite"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png"
            srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x"
            alt="Alice and the Red Queen running to stay in place."
            ref={redQueen_alice.ref}
          />
        </div>
      </div>

      <div className="scenery" id="foreground1" ref={foreground1Ref.ref}>
        <img
          id="palm3"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x"
          alt=" "
        />
      </div>
      <div className="scenery" id="foreground2" ref={foreground2Ref.ref}>
        <img
          id="bush"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x"
          alt=" "
        />
        <img
          id="w_rook_upright"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x"
          alt=" "
        />
      </div>
      <div className="scenery" id="background1" ref={background1Ref.ref}>
        <img
          id="r_pawn_upright"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x"
          alt=" "
        />
        <img
          id="w_rook"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x"
          alt=" "
        />
        <img
          id="palm1"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x"
          alt=" "
        />
      </div>
      <div className="scenery" id="background2" ref={background2Ref.ref}>
        <img
          id="r_pawn"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x"
          alt=" "
        />

        <img
          id="r_knight"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x"
          alt=" "
        />
        <img
          id="palm2"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x"
          alt=" "
        />
      </div>
    </div>
  );
};
