const useCustomizerStore = {
  state: {
    Sidebar_drawer: config.Sidebar_drawer,
    mini_sidebar: config.mini_sidebar,
    actTheme: config.actTheme,
    fontTheme: config.fontTheme
  },

  SET_SIDEBAR_DRAWER() {
    this.state.Sidebar_drawer = !this.state.Sidebar_drawer;
  },

  SET_MINI_SIDEBAR(payload) {
    this.state.mini_sidebar = payload;
  },

  SET_THEME(payload) {
    this.state.actTheme = payload;
  },

  SET_FONT(payload) {
    this.state.fontTheme = payload;
  }
};

export default useCustomizerStore;

/*
state
: 애플리케이션의 상태를 정의합니다. 여기서는 설정 객체 config에서 가져온 값들로 초기화됩니다.

SET_SIDEBAR_DRAWER
: 사이드바를 열거나 닫는 액션을 정의합니다. 현재 상태의 Sidebar_drawer 값을 반전시킵니다.

SET_MINI_SIDEBAR
: 사이드바를 미니모드로 변경하는 액션을 정의합니다. 전달된 값으로 mini_sidebar 상태를 설정합니다.

SET_THEME
: 애플리케이션 테마를 변경하는 액션을 정의합니다. 전달된 값으로 actTheme 상태를 설정합니다.

SET_FONT: 애플리케이션의 글꼴 테마를 변경하는 액션을 정의합니다. 전달된 값으로 fontTheme 상태를 설정합니다.


*/
