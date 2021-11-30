import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ApiError, createClient, Session, SupabaseClient, User, UserCredentials } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { USER_STORAGE_KEY } from 'src/assets/constants/constant';

type supabaseResponse = User | Session | ApiError | null;  //estos son tipos que vienen de supabase

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supaBaseClient : SupabaseClient;
  private userSubject = new BehaviorSubject<User>(null);


  constructor() { 
    this.supaBaseClient = createClient(environment.supabase.url, environment.supabase.publicKey);
  }

  get user$(): Observable<User | null>{
    return this.userSubject.asObservable();
  }

  async signIn(credentials: UserCredentials): Promise<supabaseResponse> {
    try {
      const {user, error, ...rest} = await this.supaBaseClient.auth.signIn(credentials);
      this.setUser();
      return error ? error : user;

    } catch (error) {   
      console.log(error);
      return error as ApiError;
    }
  }
  async signUp(credentials: UserCredentials): Promise<supabaseResponse> {
    try {
      const {user, error, ...rest} = await this.supaBaseClient.auth.signUp(credentials);
      this.setUser();
      return error ? error : user;

    } catch (error) {   
      console.log(error);
      return error as ApiError;
    }
  }
  
  private setUser():void {
    //metodo para setear el usuario
    const session = localStorage.getItem(USER_STORAGE_KEY) as unknown as User;
    this.userSubject.next(session);
  }

  signOut(): Promise<{ error: ApiError | null}>{
    this.userSubject.next(null);
    return this.supaBaseClient.auth.signOut();
  }

}
