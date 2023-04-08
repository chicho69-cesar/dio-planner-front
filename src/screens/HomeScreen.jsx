import { useEffect, useState } from 'react';
import { Stack } from 'native-base';

import EventList from '../components/home/EventList';
import LoadingEvents from '../components/home/LoadingEvents';
import BottomNavigationBar from '../components/BottomNavigationBar';

const xd = [
  {
    id: 1,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Occaecat proident tempor cupidatat mollit sunt laboris sit aute nisi dolor velit irure nostrud laborum. Qui dolor eiusmod consequat dolore mollit fugiat. Lorem commodo aliqua dolore elit deserunt tempor qui. Mollit nostrud id adipisicing deserunt qui ex.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 2,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Nulla irure adipisicing in tempor veniam et in aute tempor. Ad commodo ex deserunt eiusmod non exercitation esse dolore. Consequat eiusmod sint sunt proident eiusmod consectetur eiusmod ut minim nulla minim sit ex. Et nulla sint do adipisicing commodo velit exercitation tempor aute. Minim qui nisi commodo labore et pariatur reprehenderit. Aliqua nostrud id qui tempor sint ut ex nostrud sint dolor sint. Duis officia sint adipisicing cupidatat consectetur velit sit irure consequat amet cillum laborum occaecat.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 3,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Id consectetur magna cillum mollit ullamco sit ex. Sint sit culpa dolor consectetur aliquip voluptate cillum tempor cillum aute irure sint laboris duis. Ipsum eiusmod tempor enim dolore nulla anim. Nisi ea occaecat est tempor consectetur adipisicing ea commodo sit dolor Lorem nisi ad.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 4,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Elit eu nulla eu pariatur ut ut proident eiusmod reprehenderit laborum qui quis aliqua sunt. Excepteur pariatur deserunt do voluptate irure reprehenderit commodo duis fugiat officia sunt et. Ipsum magna irure laborum consequat est. Do officia sunt ad fugiat tempor id ullamco velit consectetur. Lorem id labore consectetur consequat ullamco. Cillum occaecat qui consectetur eu nostrud. Tempor in sit ipsum non voluptate sunt elit exercitation irure.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 5,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Culpa nulla amet aute dolore eu nostrud dolore quis fugiat reprehenderit labore. Commodo reprehenderit quis anim in. Id fugiat esse consectetur eiusmod eu sint sit sunt dolore nisi consectetur. Mollit reprehenderit culpa anim laborum quis magna sint enim.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 6,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Irure ad nisi non et exercitation dolore excepteur nostrud fugiat irure eu ea ut. Magna non est voluptate cillum. Do ea mollit aliqua minim pariatur veniam esse adipisicing occaecat aliqua nisi ullamco elit. Nulla laborum aute ipsum ea non cillum anim elit cillum. Labore qui ipsum ipsum exercitation. Adipisicing laboris culpa ipsum Lorem laboris cupidatat veniam enim sit. Ipsum do ex magna voluptate quis esse id exercitation incididunt et sunt enim.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 7,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Aute Lorem minim ullamco proident tempor esse ipsum consectetur amet sunt aliquip est. Reprehenderit aliqua exercitation eu nulla ea ad veniam ut nostrud officia ad. Eu ex fugiat ex aute in elit ipsum velit veniam do. Pariatur ullamco velit officia elit elit eu. Nostrud sunt ullamco occaecat deserunt eiusmod nisi. Elit elit ullamco velit minim officia irure velit aliqua duis proident excepteur aliqua sint.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 8,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Mollit ex eu nisi minim sunt laborum sit incididunt amet nisi labore qui. Nostrud quis eiusmod eiusmod ullamco veniam esse reprehenderit aute veniam ipsum officia. Ea et eu duis magna officia nisi dolor et duis est cupidatat aliqua. Nisi aute est amet labore. Laboris reprehenderit velit fugiat laborum anim velit.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 9,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Lorem consectetur labore Lorem id voluptate pariatur excepteur nisi Lorem adipisicing tempor exercitation ullamco irure. Laborum dolore id cupidatat incididunt nostrud minim dolor nulla dolore consectetur ullamco irure. Occaecat dolor consectetur deserunt ad ipsum. Quis exercitation excepteur ut anim aliqua aute. Cupidatat officia veniam elit mollit fugiat laboris magna dolore non pariatur.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 10,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Nostrud esse do proident nostrud voluptate sit consequat. Culpa adipisicing anim et aliquip sunt eiusmod sunt sunt id proident id sunt. Occaecat reprehenderit proident sit irure est mollit sint tempor proident velit amet officia aute pariatur. Occaecat nostrud voluptate sunt officia deserunt voluptate.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 11,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Do ea consectetur do esse cillum ullamco cupidatat laboris laboris elit exercitation proident elit proident. Aliquip pariatur consectetur cupidatat commodo deserunt minim occaecat nisi Lorem Lorem occaecat proident velit cillum. Laboris proident mollit voluptate voluptate aliquip incididunt incididunt. Aliqua anim est laboris culpa laboris officia aliquip incididunt non voluptate labore tempor incididunt consequat. Labore adipisicing anim id est ut. Pariatur nulla cupidatat proident irure labore qui esse.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 12,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Laborum elit ea ut consequat proident aute irure ad id pariatur exercitation esse sit consectetur. Commodo aliqua eu est deserunt cupidatat duis velit tempor elit irure non exercitation fugiat. Nostrud non tempor eu elit fugiat fugiat nostrud est laboris reprehenderit. Ipsum dolore eiusmod occaecat cupidatat dolore ea commodo consequat aliquip ut esse ullamco eiusmod. Excepteur consectetur eu est labore consectetur sint ex nulla laboris.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 13,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Duis aliquip excepteur ipsum voluptate ut nisi enim. Duis aliquip voluptate irure veniam aute reprehenderit sit sit. Et deserunt ut mollit fugiat tempor eiusmod ex.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 14,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Esse aliquip cillum consequat non sunt et anim qui eiusmod id ex amet exercitation eu. Dolore aute do Lorem minim aliqua ullamco mollit ut tempor. Amet commodo nulla elit laborum do qui voluptate occaecat veniam deserunt incididunt.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 15,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Labore minim eiusmod officia irure duis excepteur irure pariatur in mollit ut veniam culpa. Occaecat nulla aliqua adipisicing qui veniam cupidatat quis laborum anim. Est ex Lorem labore adipisicing dolore. In elit cupidatat pariatur duis minim irure pariatur. Quis reprehenderit consectetur est quis. Officia quis et consequat qui ea do exercitation dolor velit ut culpa et irure. Amet excepteur tempor duis laboris ea in.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 16,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Dolore duis ex culpa veniam consequat tempor fugiat dolore. Irure ex elit eu reprehenderit Lorem. Laboris labore occaecat non sunt laboris magna nostrud cupidatat velit. Et exercitation commodo duis sint exercitation consectetur dolore ipsum deserunt. Aliquip fugiat anim dolor est ex proident adipisicing in ipsum deserunt qui esse enim fugiat. Magna dolor ullamco officia excepteur qui aliquip Lorem ipsum ipsum aliqua.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 17,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Ipsum dolore tempor magna aute ut minim amet veniam officia. Aliqua proident sit minim reprehenderit laborum ullamco consectetur id ipsum irure id incididunt laborum ea. Irure exercitation aliquip voluptate incididunt non nulla ut proident fugiat ex. Et proident duis deserunt pariatur fugiat aliquip. Fugiat pariatur eu eiusmod consectetur. Nulla adipisicing labore fugiat adipisicing nulla esse commodo duis deserunt culpa irure dolore laborum cupidatat.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }, {
    id: 18,
    name: 'Cesar',
    date: '08 de abril del 2023',
    description: `Exercitation incididunt sint ut occaecat sint sint elit incididunt. Nostrud duis laboris ut dolor aliqua Lorem sint ut aliqua ea labore fugiat. Aliquip velit ut nostrud cillum ea. Amet sint officia quis qui eu tempor deserunt amet aliquip. Esse excepteur aliqua duis et velit anim non irure exercitation sunt dolore ut. In quis ex magna esse voluptate nulla voluptate Lorem mollit. Ex aliqua Lorem id id in nisi quis tempor magna voluptate commodo eiusmod.`,
    img: 'https://i.pinimg.com/564x/ce/d4/52/ced452ac20b69e062d341cfeb61b2226.jpg'
  }
];

export default function HomeScreen({ navigation, route }) {
  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setEvents([ ...xd ]);
    }, 3000);
  }, []);

  return <Stack 
    w='100%' h='100%' alignItems='center' 
    justifyContent='center'
  >
    <Stack h='100%' w='100%' px={4} pt={16} pb={0}>
      {
        events.length === 0 
          ? <LoadingEvents/>
          : <EventList
            navigation={navigation}
            route={route}
            events={events}
          />
      }
    </Stack>

    <BottomNavigationBar
      navigation={navigation}
      route={route}
      active='Home'
    />
  </Stack>;
}
