import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faTrash, 
  faSignOutAlt, 
  faEdit, 
  faTimes, 
  faSpinner, 
  faPlusSquare,
  faEnvelope,
  faLock 
} from '@fortawesome/free-solid-svg-icons';

const Icons = () => {

  return library.add(
    faTrash,
    faSignOutAlt,
    faEdit,
    faTimes,
    faSpinner, 
    faPlusSquare,
    faEnvelope,
    faLock 
  );
};

export default Icons;