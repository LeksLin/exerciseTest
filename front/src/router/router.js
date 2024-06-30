import Account from "../UI/Account/Account";
import Authorization from "../UI/Authorization/Authorization";
import People from "../UI/People/People";
import PeopleCard from "../UI/PeopleCard/PeopleCard";
import Registration from "../UI/Registration/Registration";

export const publicRoutes = [
    {path: '/registration', component: Registration, exact: true},
    {path: '/', component: Authorization, exact: true},
    {path: '/account', component: Account, exact: true},
    {path: '/people', component: People, exact: true},
    {path: '/people/НеПомню!!!!', component: PeopleCard, exact: true}
]

export const privateRoutes = [
    {path: '/account', component: Account, exact: true},
    {path: '/people', component: People, exact: true},
    {path: '/people/НеПомню!!!!', component: PeopleCard, exact: true}
]