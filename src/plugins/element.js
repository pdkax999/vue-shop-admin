import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  Switch,
  TableColumn,
  Popover,
  Pagination,
  Dialog,
  MessageBox,
  Select,
  Option
} from 'element-ui'
Vue.use(Dialog);
Vue.use(Option);
Vue.use(Select);
Vue.use(Pagination);
Vue.use(Popover)
Vue.use(Switch)
Vue.use(Breadcrumb)
Vue.use( BreadcrumbItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Table);
Vue.use(TableColumn);

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm 
