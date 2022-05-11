import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HelloComponent } from './components/hello-component/hello-component.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarreDeRechercheComponent } from './components/barre-de-recherche/barre-de-recherche.component';
import { ForumComponent } from './components/forum/forum.component';
import { ClassComponent, ParticiperForm } from './components/class/class.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AccueilComponent } from './components/accueil/accueil.component';
import { NewProduct, ProduitsComponent } from './components/Produits/produits.component';
import { QuestionComponent } from './components/question/question.component';
import { CartComponent } from './components/cart/cart.component';
import { UserService } from './services/user/user-service.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AppComponent } from './components/app/app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserloginComponent } from './userlogin/userlogin.component';
import { NewclasseComponent } from './components/newclasse/newclasse.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { FooterComponent } from './components/footer/footer.component';
import { UpdateProduitComponent } from './components/update-produit/update-produit.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GoogleMapsModule } from '@angular/google-maps';
import { AnswerComponent } from './components/answer/answer.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { NotifiationComponent } from './components/notification/notification.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'produits', component: ProduitsComponent },
  { path: 'cours', component: ClassComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'users', component: UserListComponent },
  { path: 'adduser', component: UserFormComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'cart', component: CartComponent },
  { path: 'userForm', component: UserFormComponent },
  { path: 'login', component: UserloginComponent },
  { path: 'newclasse', component: NewclasseComponent },
  { path: 'profil', component: UserProfilComponent },
  { path: 'updateProduit/:id', component: UpdateProduitComponent },
  { path: 'answer/:id', component: AnswerComponent },
  { path: 'localisationCours', component:MapComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    BarreDeRechercheComponent,
    AccueilComponent,
    ForumComponent,
    ClassComponent,
    ProduitsComponent,
    UserListComponent,
    UserFormComponent,
    QuestionComponent,
    CartComponent,
    NewProduct,
    UserProfilComponent,
    UserloginComponent,
    NewclasseComponent,
    UserProfilComponent,
    FooterComponent,
    UpdateProduitComponent,
    ParticiperForm,
    AnswerComponent,
    ConnexionComponent,
    NotifiationComponent,
    MapComponent

  ],
  imports: [
    BrowserModule,
    /*AppRoutingModule,*/
    GoogleMapsModule,
    LeafletModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot(routes),
    CommonModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    ClickOutsideModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAuYO5F-4zzcL1jWSb5I-lVTp2lrDEpBns'
    })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
