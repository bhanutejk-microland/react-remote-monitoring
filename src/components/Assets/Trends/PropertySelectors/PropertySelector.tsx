import React, { FunctionComponent } from 'react';
// import Chip from '@material-ui/core/Chip';

import Chip from '../../../UI/Chip/Chip';

interface PropertySelectorProps {
  propertyName: string;
  deletePropertySelector: (property: any) => void;
}

const handleDelete = () => {
  console.log("deleted");
}

const PropertySelector: FunctionComponent<PropertySelectorProps> = ({
  propertyName,
  deletePropertySelector
}) => {
  return (
    <div style={{ margin: '12px 0' }}>
      <Chip label={propertyName} deleted={deletePropertySelector} />
    </div>
  );
}

export default PropertySelector;


