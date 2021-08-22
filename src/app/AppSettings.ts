
export class AppSettings {    
    public static IsLogedIn = false;
    public static UserName = '';
    public static UserId = 0;

    public static Users = [
        {id : 1, name : 'User1'},
        {id : 2, name : 'User2'},
        {id : 3, name : 'User3'},
    ]


    public static logOut() : void {
        this.IsLogedIn = false;
        this.UserName = '';
        this.UserId = 0;
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
    }

    public static doLogin(user: any) : void {
        this.IsLogedIn = localStorage.getItem('userName') ? true : false;
        localStorage.setItem('userName', user?.name ?? '');
        localStorage.setItem('userId', user?.id.toString() ?? '');
        this.UserName = user?.name ?? '';
        this.UserId = user?.id ?? 0;
    }

    public static getUser() : void {
        this.UserName = localStorage.getItem('userName') ?? '';
        let id = localStorage.getItem('userId');
        this.UserId = id != null ? +id : 0;
    }
 }