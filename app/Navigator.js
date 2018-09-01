import { createStackNavigator} from 'react-navigation';
import Home from './pages/Home'
import BookDetails from './pages/BookDetails';

export default createStackNavigator({
    Home,
    BookDetails
},
{
    initialRouteName: 'Home',
    headerMode: 'none'
})