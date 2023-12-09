import cn from 'classnames'
import s from './header.module.css'

export const Header = () => {

    
  return (
    <div className={s.header}>
      <nav className={s.header__nav}>
        <button className={cn(s.header__btn_main_enter, s.btn_hov01)} id="btnMainEnter">
          Вход в личный кабинет
        </button>
      </nav>
    </div>
  );
};