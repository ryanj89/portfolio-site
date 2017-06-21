import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';



// `Routes
const appRoutes : Routes = [
  { path: '', component: AppComponent },
  // { path: 'challenges', component: ChallengesComponent, children: [
  //     { path: '', component: ChallengeListComponent },
  //     { path: 'new', component: ChallengeNewComponent },
  //     { path: ':id', component: ChallengeDetailComponent },
  //   ]
  // },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  // { path: 'my-challenges', component: ChallengesPersonalComponent, canActivate: [AuthGuard] },
  // { path: 'callback', component: CallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }