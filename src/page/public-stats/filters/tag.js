import { far } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Tag({children, onRemove, tagStyle = {}, labelStyle = {}, buttonStyle = {}}) {
    return (
      <div style={{...styles.tag, ...tagStyle}}>
        <span style={{...styles.label, ...labelStyle}}>{children}</span>
        <button onClick={onRemove} style={{...styles.button, ...buttonStyle}}><FontAwesomeIcon icon={faTimes} size="sm"/></button>
      </div>
    );
  }
  
  const styles = {
    tag: {
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: '6px',
        padding: '4px 8px',
        margin: '4px',
    },
    label: {
      marginRight: '10px',
    },
    button: {
        background: 'none',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        lineHeight: '1',
        padding: '0',
    },
  };