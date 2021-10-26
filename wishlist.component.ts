import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { ShopService } from 'src/app/services/shop.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  @ViewChild('item') item: any;
  @ViewChild('button', {read: ElementRef, static: true}) button: ElementRef

  constructor(private wish: WishlistService,private data: DataBaseService , private animationCtrl: AnimationController, private shop: ShopService) { }

  ngOnInit() {
  }

  removeFromWishList(i) {
    this.wish.removeProductFromWishList(i).then(() => {
      this.wish.loadData;
    }); 
  }

  click() {
    const animation = this.animationCtrl
    .create()
    .addElement(this.button.nativeElement)
    .duration(1000)
    .fromTo('color', 'red', 'blue')
    animation.play();
  }

  itemSlide(evt) {
    if (evt.detail.ratio < 1) {
      this.shop.swipe = false;
    } else {
      this.shop.swipe = true;
    }
  }

}
