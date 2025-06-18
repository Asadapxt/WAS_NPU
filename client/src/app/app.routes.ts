import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RankComponent } from './pages/rank/rank.component';
import { EvalCriteriaComponent } from './pages/eval-criteria/eval-criteria.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { AppealComponent } from './pages/appeal/appeal.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EvalResultComponent } from './pages/eval-result/eval-result.component';
import { ReportResultComponent } from './pages/report-result/report-result.component';
import { EvalTrackComponent } from './pages/eval-track/eval-track.component';
import { CommitteeComponent } from './pages/committees/committee/committee.component';
import { CommitteeSignInComponent } from './pages/committees/committee-sign-in/committee-sign-in.component';
import { ChairmanFormComponent } from './pages/committees/chairman-form/chairman-form.component';
import { EvalForm1Component } from './pages/prepare-eval-forms/eval-form1/eval-form1.component';
import { EvalForm2Component } from './pages/prepare-eval-forms/eval-form2/eval-form2.component';
import { RegisteryComponent } from './pages/registery/registery.component';
import { authGuard } from './guards/auth/auth.guard';
import { CallbackComponent } from './guards/callback/callback.component';
import { roleGuard } from './guards/role/role.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register',canActivate: [authGuard], component:RegisteryComponent },
    { path: 'callback', component:CallbackComponent },
    {
        path: 'NPU', canActivate: [authGuard], component: NavbarComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'admin', canActivate: [roleGuard(['user', 'committee', 'chairman'])], component:AdminComponent },
            { path: 'home', component:HomeComponent },
            { path: 'rank', component:RankComponent },
            { path: 'eval-criteria', component:EvalCriteriaComponent },
            { path: 'eval-form-1', canActivate: [roleGuard(['admin'])], component:EvalForm1Component },
            { path: 'eval-form-2', canActivate: [roleGuard(['admin'])], component:EvalForm2Component },
            { path: 'eval-result', canActivate: [roleGuard(['admin'])], component:EvalResultComponent },
            { path: 'report-result', canActivate: [roleGuard(['admin'])], component:ReportResultComponent },
            { path: 'appeal', canActivate: [roleGuard(['admin'])], component:AppealComponent },
            { path: 'eval-track', canActivate: [roleGuard(['admin'])], component:EvalTrackComponent },
            { path: 'p-info', canActivate: [roleGuard(['admin'])], component:PersonalInfoComponent },
            { path: 'committee', canActivate: [roleGuard(['admin', 'user'])], component:CommitteeComponent },
            { path: 'committee/check', canActivate: [roleGuard(['admin', 'user'])], component:CommitteeSignInComponent },
            { path: 'committee/chairman-form', canActivate: [roleGuard(['admin', 'user', 'committee'])], component:ChairmanFormComponent },
        ]
    },

];