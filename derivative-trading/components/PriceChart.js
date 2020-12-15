import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  SlideAreaChart
} from 'react-native-slide-charts';
import { BlueLoading } from '../../BlueComponents';
import { BlueCurrentTheme } from '../../components/themes';
import { convertYDataRange } from '../class/Utils';


export default class PriceChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      x: 0,
      y: 0,
      showVLine: false,
      chartColor: 'black',
    };

    this.dimensions = Dimensions.get('window');
    this.showMeanLine = props.showMeanLine || false;
    this.lineColor = props.lineColor || BlueCurrentTheme.colors.tradingProfit;
    this.calcMeanReturn = this.calcMeanReturn.bind(this);
    this.onChartInteraction = this.onChartInteraction.bind(this);
  }

  calcMeanReturn() {
    return this.props.data.map(item => item.value / 1000).reduce((a, b) => a + b, 0) / this.props.data.length;
  }

  onChartInteraction(e) {
    if (e.nativeEvent.state === 5) {
      this.setState({ showVLine: false });
    } else {
      this.setState({ showVLine: true });
    }
  }

  calcColor(data) {
    const dataLength = data.length;
    if (dataLength > 0 && data[0].y < data[dataLength - 1].y) {
      return 'rgb(0, 204, 102)';
    } else {
      return 'rgb(189, 44, 30)';
    }
  }

  render() {
    return (
      <View style={[styles.mainContainer, this.props.styles]}>
        <View style={[styles.chartContentContainer, { height: this.props.containerHeight }]}>
          {this.props.data.length !== 0 ? (
            <SlideAreaChart
              height={this.props.height}
              data={this.props.data}
              throttleAndroid={true}
              alwaysShowIndicator={false}
              animated={false}
              style={{ backgroundColor: 'black', marginBottom: 0 }}
              xScale={'time'}
              yAxisProps={{
                showBaseLine: false,
                verticalLineWidth: 0,
                horizontalLineWidth: 0,
              }}
              yRange={convertYDataRange(this.props.data)}
              chartLineColor={this.calcColor(this.props.data)}
              fillColor={'black'}
              paddingLeft={0}
              paddingRight={0}
              paddingBottom={0}
              paddingTop={40}
              callbackWithY={(data) => {
                // this.props.onCursorChange(data);
                // this.props.onCursorRelease(false, 0);
              }}
              toolTipProps={{
                // toolTipTextRenderers: [
                //   ({ scaleX, x }) => (
                //     {
                //       text: moment(scaleX.invert(x)).format('Do MMM yy').toString(),
                //     }),
                // ],
              }}
              showIndicatorCallback={(e) => {
                // if (e === 0) {
                //   if (this.props.data[this.props.data.length - 1]) {
                //     this.props.onCursorRelease(true, this.props.data[this.props.data.length - 1].y);
                //   }
                // }
              }}
              cursorProps={{
                cursorColor: this.calcColor(this.props.data),
                cursorWidth: 1,
                cursorMarkerWidth: 20,
                cursorMarkerHeight: 20,
              }} />
          ) : (
              <BlueLoading paddingTop={this.props.height / 2} paddingBottom={this.props.height / 2}></BlueLoading>
            )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    // overflow: 'hidden',
    // flex: 1,
  },

  chartContentContainer: {
    overflow: 'hidden',
  },

  button: {
    backgroundColor: 'white',
    color: 'white',
  },

});