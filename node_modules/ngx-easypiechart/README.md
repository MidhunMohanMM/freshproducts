
# ngx-easypiechart

ng 6/7 module for easy-pie-chart.

## EasyPieChart

More details on [easy-pie-chart](https://github.com/rendro/easy-pie-chart "Title").

## Usage

### package.json

Add the following to ``package.json`` file.

```json
    "easy-pie-chart": "~2.1.7",
    "ngx-easypiechart": "0.1.5"
```

### app.module.ts

Add the following to ``app.module.ts`` file.

```typescript
import { NgxEasypiechartModule } from 'ngx-easypiechart';
..
..
imports: [
  ...,
  NgxEasypiechartModule,
  ...
]
```

### macro

```html
<ngx-easypiechart [options]="options" [percent]="percent">
</ngx-easypiechart>
```

### typescript code

```typescript
  constructor() {
    this.percent = 80;
    this.options = {
      size: 50,
      rotate: 0
    };
    ...
  }
```

For the exhaustive list of options, refer to the [original easy-pie-chart documentation](https://github.com/rendro/easy-pie-chart#options "Title")

## Development

### Prepare dist version

```bash
ng build ngx-easypiechart --prod
```

(aliter:)

```bash
npm run build
```
