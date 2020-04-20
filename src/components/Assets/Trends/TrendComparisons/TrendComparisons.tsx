import React,{ Component } from 'react';

import XyComparisonChart from '../../../Charts/XyComparisonChart';

interface TrendComparisonsProps {
  trendInfo: any
}

interface TrendComparisonsState {}

class TrendComparisons extends Component<TrendComparisonsProps, TrendComparisonsState> {
  constructor(props: TrendComparisonsProps) {
    super(props);
  }
  render() {
    return <div>
      <XyComparisonChart data={this.props.trendInfo} />
    </div>
  }
}

export default TrendComparisons;
