import {Directive, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector:'[Dropdown]'
})
export class DropdownDirective{

  //对样式的绑定 用true or false来封装样式
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

}

