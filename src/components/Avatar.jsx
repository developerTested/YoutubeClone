import { getInitials } from "../utilities/helpers";
import classNames from "classnames";

export default function Avatar({
  src,
  alt,
  size,
  rounded,
  className,
}) {


  let sizeClass;

  switch (size) {
    case 'extra-small':
      sizeClass = 'w-16 h-16';
      break;
    case 'small':
      sizeClass = 'w-24 h-24';
      break;
    case 'normal':
      sizeClass = 'w-32 h-32';
      break;
    case 'medium':
      sizeClass = 'w-48 h-48';
      break;
    case 'large':
      sizeClass = 'w-60 h-60';
      break;
    case 'xl':
      sizeClass = 'w-96 h-96';
      break;
    default:
      sizeClass = 'w-12 h-12';
      break;
  }

  const avatarClass = classNames('flex items-center justify-center bg-slate-100 relative',
    sizeClass,
    className, {
    'rounded-full': rounded,
  })

  return (
    <div className={avatarClass}>
      {src?.length ?
        <img src={src} alt={getInitials(alt ?? '')} className={`w-full h-full object-cover ${rounded ? 'rounded-full' : ''}`} /> : <div className="font-semibold">{getInitials(alt ?? '')}</div>}
    </div>
  )
}
