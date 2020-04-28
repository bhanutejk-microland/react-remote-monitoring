import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface ChipProps {
  label: string;
  color?: string;
  deleted?: (property: any) => void;
  chipId?: string;
}

const Chip: FunctionComponent<ChipProps> = ({
  label,
  color,
  deleted,
  chipId
}) => {
  return (<div style={{ color: '#ffffff', backgroundColor: '#5d33ceb3', display: 'flex', justifyContent: 'space-between', padding: '12px 12px 12px 10px', borderRadius: '4px' }}>
    <div>{label}</div>
    <div onClick={() => deleted!(chipId ? chipId : label)}><FontAwesomeIcon icon={faTimesCircle} /></div>
  </div>)
}

export default Chip
