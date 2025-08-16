
const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };
  
const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.4,
  };
  

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };
  

const buttonHoverTap = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  
  export{pageTransition, pageVariants, modalVariants, buttonHoverTap, cardVariants}