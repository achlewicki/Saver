import { Component, AfterViewInit, ContentChildren, ViewChild, Input, ElementRef, QueryList } from '@angular/core';
import { AnimationBuilder, AnimationFactory, animate, style } from '@angular/animations';
import { CarouselItemDirective } from '../carousel-item.directive';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'svr-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {

  @ContentChildren(CarouselItemDirective)
  protected items: QueryList<CarouselItemDirective>;

  @ViewChild('carousel', { static: false })
  private carousel: ElementRef;

  @Input()
  private animationTime = '250ms ease-in';

  // @Input()
  protected numberOfItems = 1;

  @Input()
  protected maxVisibleItems = 5;

  private itemWidth: number;
  protected currentSlide = 0;
  protected arrow = faChevronLeft;

  constructor(private animationBuilder: AnimationBuilder) { }

  ngAfterViewInit(): void {
    const carouselElement = this.carousel.nativeElement as HTMLElement;
    this.itemWidth = carouselElement.children.item(0).clientWidth;
    carouselElement.parentElement.style.maxWidth = `${this.itemWidth * this.maxVisibleItems}px`;
    // carouselElement.parentElement.style.width = `${this.itemWidth * this.numberOfItems}px`;
  }

  public next(): void {
    if (this.currentSlide + this.numberOfItems === this.items.length) { return; }
    this.currentSlide++;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.animateMove(offset);
    myAnimation.create(this.carousel.nativeElement).play();
  }

  public prev(): void {
    if (this.currentSlide === 0) { return; }
    this.currentSlide--;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.animateMove(offset);
    myAnimation.create(this.carousel.nativeElement).play();
  }

  private animateMove(offset: number): AnimationFactory {
    return this.animationBuilder.build(
      animate(this.animationTime, style({ transform: `translateX(-${offset}px)` }))
    );
  }

}
