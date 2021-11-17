import { Component, OnInit } from '@angular/core';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { ModalController } from '@ionic/angular';
import { ShopService } from 'src/app/services/shop.service';
import SwiperCore, { FreeMode, SwiperOptions } from 'swiper';

SwiperCore.use([FreeMode]);

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product = null;
  productImage = [];
  productId: number = null;

  index: number = 0;

  config: SwiperOptions = {
    effect: 'slide',
    freeMode: true,
    slidesPerView: 3
  }

  constructor(private shop: ShopService, private spinner: SpinnerDialog, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.productId = this.shop.productId;
    this.spinner.show(null, null, true);
    this.shop.getProductById(this.productId).subscribe(res => {
      console.log(res);
      this.product = res;
      this.productImage = res['images'];
      console.log(this.productImage);
      
      this.spinner.hide();
    });
  }

  changePrd(i) {
    this.index = i;
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

}