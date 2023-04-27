

export function getDescriptionSize(windowWidth: number) {
  if (windowWidth < 576) {
    return 'fs-6';
  } else if (windowWidth < 768) {
    return 'fs-5';
  } else if (windowWidth < 992) {
    return 'fs-5';
  } else if (windowWidth < 1400) {
    return 'fs-4';
  } else {
    return 'fs-4';
  }
}

export function getTitleSize(windowWidth: number) {
  if (windowWidth < 576) {
    return 15;
  } else if (windowWidth < 768) {
    return 20;
  } else if (windowWidth < 992) {
    return 25;
  } else if (windowWidth < 1400) {
    return 30;
  } else {
    return 35;
  }
}

export function getButtonSize(windowWidth: number) {
  if (windowWidth < 576) {
    return undefined;
  } else if (windowWidth < 768) {
    return 'lg';
  } else if (windowWidth < 992) {
    return 'lg';
  } else if (windowWidth < 1400) {
    return 'lg';
  } else {
    return 'lg';
  }
}
