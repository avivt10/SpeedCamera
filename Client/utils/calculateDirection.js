// Converts from degrees to radians.
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// Converts from radians to degrees.
function toDegrees(radians) {
  return (radians * 180) / Math.PI;
}

function calculateDirection({ lat: φ1 , lon: λ1 }, { lat: φ2, lon: λ2 }) {
  const y = Math.sin(λ2-λ1) * Math.cos(φ2);
  const x = Math.cos(φ1)*Math.sin(φ2) -
            Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
  const θ = Math.atan2(y, x);
  return (θ*180/Math.PI + 360) % 360; // in degrees
}


export default calculateDirection;
