import React, { Component } from 'react';
import PropertySelector from './PropertySelector';

interface PropertySelectorsProps {
  propertyList: any
  deletePropertySelector: (property: any) => void;
}

interface PropertySelectorsState { }

class PropertySelectors extends Component<PropertySelectorsProps, PropertySelectorsState> {
  constructor(props: PropertySelectorsProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.propertyList !== nextProps.propertyList
    );
  }

  render() {
    return <div>
      {this.props.propertyList.map(property => {
        return <PropertySelector key={property} propertyName={property} deletePropertySelector={this.props.deletePropertySelector} />
      })}
    </div>
  }
}

export default PropertySelectors;
