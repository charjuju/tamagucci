// App.tsx

import './App.css';
import Bare from './Bare';
import { useState, useEffect } from 'react';
import { formatDate } from './date';
import { MenuItem, menuPrincipal, menuHygiène, menuNourriture, menuFrigo, menuSocial, menuÉquipements } from './menu';

function App() {
  const [money, setMoney] = useState<number>(() => {
    const savedMoney = localStorage.getItem('money');
    return savedMoney !== null ? Number(savedMoney) : 100;
  });
  const [hp, setHp] = useState<number>(() => {
    const savedHp = localStorage.getItem('hp');
    return savedHp !== null ? Number(savedHp) : 100;
  });
  const [food, setFood] = useState<number>(() => {
    const savedFood = localStorage.getItem('food');
    return savedFood !== null ? Number(savedFood) : 100;
  });
  const [menuSelect, setMenuSelect] = useState<MenuItem[]>(menuPrincipal);
  const [menuIndex, setMenuIndex] = useState<number>(0);

  const intervalTime = 500;

  function setFoodAnLocal(value: number) {
    setFood(value);
    localStorage.setItem('food', value.toString());
  }

  function setMoulaLocal(value: number) {
    setMoney(value);
    localStorage.setItem('money', value.toString());
  }

  function setHpLocal(value: number) {
    setHp(value);
    localStorage.setItem('hp', value.toString());
  }

  useEffect(() => {
    const lastUpdateTime = localStorage.getItem('lastUpdateTime');
    const now = Date.now();

    if (lastUpdateTime) {
      const elapsedTime = now - Number(lastUpdateTime);
      const timesDecremented = Math.floor(elapsedTime / intervalTime);
      if (timesDecremented > 0) {
        const newFoodValue = Math.max(food - timesDecremented, 0);
        setFoodAnLocal(newFoodValue);
      }
    }
    localStorage.setItem('lastUpdateTime', now.toString());

    const interval = setInterval(() => {
      setFood((prevFood) => {
        const newFoodValue = Math.max(prevFood - 1, 0);
        localStorage.setItem('food', newFoodValue.toString());
        localStorage.setItem('lastUpdateTime', Date.now().toString());
        if (newFoodValue !== 0) {
          localStorage.setItem('prochaineFamine', (Date.now() + (newFoodValue * intervalTime)).toString());
          console.log("new food value: ", formatDate(Date.now() + (newFoodValue * intervalTime)));
        } else if (newFoodValue === 0 && hp > 0) {
          setHpLocal(Math.max(hp - 1, 0));
          console.log("hp", hp);
        }
        return newFoodValue;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [hp]);

  useEffect(() => {
    const now = Date.now();
    const prochaineFamine = Number(localStorage.getItem('prochaineFamine'));

    console.log(formatDate(prochaineFamine), (now - prochaineFamine) / intervalTime);
    if (((now - prochaineFamine) / intervalTime) > 0) {
      console.log("cacac", (now - prochaineFamine) / intervalTime, Math.max(hp - ((now - prochaineFamine) / intervalTime), 0));
      setHpLocal(Math.max(hp - ((now - prochaineFamine) / intervalTime), 0));
    }
  }, []);

  const handleAction = (action: MenuItem) => {
    switch (action.type) {
      case 'goToMenu':
        switch (action.name) {
          case 'hygiène':
            setMenuSelect(menuHygiène);
            break;
          case 'nourriture':
            setMenuSelect(menuNourriture);
            break;
          case 'plaisir':
            // Ajoutez le menu plaisir ici quand vous le créez
            break;
          case 'social':
            setMenuSelect(menuSocial);
            break;
          case 'équipements':
            setMenuSelect(menuÉquipements);
            break;
          case 'frigo':
            setMenuSelect(menuFrigo);
            break;
          default:
            setMenuSelect(menuPrincipal);
            break;
        }
        setMenuIndex(0);
        break;
      case 'action':
        // Exécutez des actions spécifiques ici
        console.log(`Action exécutée: ${action.name}`);
        break;
      case 'objetAction':
        // Exécutez des actions spécifiques liées à un objet ici
        console.log(`Action objet exécutée: ${action.name} avec les données ${action.data}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className='contenant'>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <Bare value={hp} valueMax={100} name="HP" />
        <Bare value={food} valueMax={100} name="Food" />
        <div style={{ display: 'flex' }}><p><strong>Moula: {money}</strong></p></div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <button onClick={() => setHpLocal(Math.min(hp + 10, 100))}>Heal</button>
        <button onClick={() => setFoodAnLocal(Math.min(food + 10, 100))}>Feed</button>
        <button onClick={() => setMoulaLocal(money + 100)}>Branle</button>
      </div>
      <div className='game'>
        <div className='menu'>
          <p>{menuSelect[menuIndex].name}</p>
        </div>
      </div>
      <button onClick={() => setMenuIndex((menuIndex + 1) >= menuSelect.length ? 0 : menuIndex + 1)}>A</button>
      <button onClick={() => handleAction(menuSelect[menuIndex])}>B</button>
      <button onClick={() => setMenuSelect(menuPrincipal)}>C</button>
      <button onClick={() => console.log("D")}>D</button>
    </div>
  );
}

export default App;
