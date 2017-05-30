import { StackNavigator } from 'react-navigation';
import Instructions from './components/Instructions';
import PerformanceView from './components/PerformanceView';

const Navigator = StackNavigator(
    {
        Instructions: { screen: Instructions },
        PerformanceView: { screen: PerformanceView }
    },
    {
        navigationOptions: {
            header: null
        }
    }
);

export default Navigator;
