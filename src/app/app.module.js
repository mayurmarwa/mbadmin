var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MarketPage } from '../pages/market/market';
import { PricesPage } from '../pages/prices/prices';
import { EnquiriesPage } from '../pages/enquiries/enquiries';
import { NotificationsPage } from '../pages/notifications/notifications';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { MyProductsPage } from '../pages/my-products/my-products';
import { SelectCategoryPage } from '../pages/select-category/select-category';
import { AddProductPage } from '../pages/add-product/add-product';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { ProductPagePage } from '../pages/product-page/product-page';
import { SendEnquiryPage } from '../pages/send-enquiry/send-enquiry';
import { EnquiryDetailsPage } from '../pages/enquiry-details/enquiry-details';
import { PostBuyRequirementsPage } from '../pages/post-buy-requirements/post-buy-requirements';
import { BrowseRequirementsPage } from '../pages/browse-requirements/browse-requirements';
import { SendQuotationPage } from '../pages/send-quotation/send-quotation';
import { RequirementDetailsPage } from '../pages/requirement-details/requirement-details';
import { DirectoryPage } from '../pages/directory/directory';
import { SpeedDialPage } from '../pages/speed-dial/speed-dial';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { TabContactsPage } from '../pages/tab-contacts/tab-contacts';
import { TabProfilePage } from '../pages/tab-profile/tab-profile';
import { TabChatsPage } from '../pages/tab-chats/tab-chats';
import { ChatChannelPage } from '../pages/chat-channel/chat-channel';
import { ChatMessagePage } from '../pages/chat-message/chat-message';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { SignupPage } from '../pages/signup/signup';
import { CreateProfilePage } from '../pages/create-profile/create-profile';
import { ProfileData } from '../providers/profile-data';
import { ProductData } from '../providers/product-data';
import { AuthService } from '../providers/auth.service';
import { ChatsService } from '../providers/chats.service';
import { AngularFireModule } from 'angularfire2';
export var firebaseConfig = {
    apiKey: "AIzaSyBQHf2p8RLOuw7i_DHdsfc8HHCFfwcIPEQ",
    authDomain: "metbazaardev.firebaseapp.com",
    databaseURL: "https://metbazaardev.firebaseio.com",
    storageBucket: "metbazaardev.appspot.com",
    messagingSenderId: "79899062384"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            TabsPage,
            MarketPage,
            PricesPage,
            NotificationsPage,
            EnquiriesPage,
            MyProfilePage,
            MyProductsPage,
            SelectCategoryPage,
            AddProductPage,
            EditProductPage,
            ProductPagePage,
            SendEnquiryPage,
            EnquiryDetailsPage,
            PostBuyRequirementsPage,
            BrowseRequirementsPage,
            SendQuotationPage,
            RequirementDetailsPage,
            DirectoryPage,
            SpeedDialPage,
            SettingsPage,
            TabContactsPage,
            TabProfilePage,
            TabChatsPage,
            ChatChannelPage,
            ChatMessagePage,
            LoginPage,
            AboutPage,
            ResetpasswordPage,
            SignupPage,
            CreateProfilePage
        ],
        imports: [
            IonicModule.forRoot(MyApp),
            AngularFireModule.initializeApp(firebaseConfig)
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            TabsPage,
            MarketPage,
            PricesPage,
            EnquiriesPage,
            NotificationsPage,
            MyProfilePage,
            MyProductsPage,
            SelectCategoryPage,
            AddProductPage,
            EditProductPage,
            ProductPagePage,
            SendEnquiryPage,
            EnquiryDetailsPage,
            PostBuyRequirementsPage,
            BrowseRequirementsPage,
            SendQuotationPage,
            RequirementDetailsPage,
            DirectoryPage,
            SpeedDialPage,
            SettingsPage,
            TabContactsPage,
            TabProfilePage,
            TabChatsPage,
            ChatChannelPage,
            ChatMessagePage,
            LoginPage,
            AboutPage,
            ResetpasswordPage,
            SignupPage,
            CreateProfilePage
        ],
        providers: [AuthService, ChatsService, ProfileData, ProductData, { provide: ErrorHandler, useClass: IonicErrorHandler }]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map