# Fuse Angular Admin Template - AI Coding Guide

## Architecture Overview

This is **Fuse v19.0.0**, a premium Angular admin template built on **Angular 20** with a custom theming system, PrimeNG integration, and a comprehensive component library.

### Key Architectural Patterns

**Provider-Based Configuration**: The app uses a centralized provider pattern for configuration. Core functionality is initialized through `provideFuse()` in `app.config.ts`:
- Mock API services are registered via `mockApi.services` array
- Theme configuration includes layout type (`classy`, `classic`, etc.), color scheme, and custom themes
- Services auto-initialize through `provideEnvironmentInitializer()` and `provideAppInitializer()`

**@fuse Library Structure**: The `src/@fuse/` directory contains reusable infrastructure:
- **Components**: `alert`, `card`, `drawer`, `navigation`, `loading-bar`, `masonry` - all standalone components
- **Services**: `FuseConfigService`, `FuseNavigationService`, `FuseMediaWatcherService`, `FuseSplashScreenService`, `FuseLoadingService`
- **Mock API**: `FuseMockApiService` intercepts HTTP requests via `mockApiInterceptor` for development

**Layout System**: Dynamic layout switching via `LayoutComponent` (see `src/app/layout/`):
- 10+ layouts: vertical (`classy`, `classic`, `compact`, etc.) and horizontal (`centered`, `enterprise`, etc.)
- Layout selected via route data: `data: { layout: 'empty' }` or from `FuseConfigService`
- Each layout is a standalone component loaded conditionally

## Technology Stack

- **Angular 20.3.9** with standalone components (no NgModules)
- **PrimeNG 20.2.0** for UI components with custom `FusePrimePreset` theme
- **Tailwind CSS 3.4+** with custom palette generator (`src/@fuse/tailwind/utils/generate-palette`)
- **Transloco 6.0** for i18n (English/Turkish)
- **ApexCharts** via `ng-apexcharts` for visualizations
- **Perfect Scrollbar** for custom scrollbars

## Development Workflows

### Running the App
```bash
npm start  # Serves on http://localhost:4222
```

### Building
```bash
npm run build          # Production build
npm run watch          # Development build with watch
```

### Key Commands
- Port is **4222** (not default 4200) - see `angular.json` serve configuration
- SCSS preprocessor paths include `src/@fuse/styles` globally
- Style load order matters (see `angular.json`): PrimeNG → Fuse Tailwind → Themes → Vendors → Main → App styles

## Critical Conventions

### Component Creation
- **Always use standalone components** with explicit imports
- Example pattern from `src/app/modules/admin/example/example.component.ts`:
  ```typescript
  @Component({
      selector: 'example',
      standalone: true,
      templateUrl: './example.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [ButtonModule, InputTextModule, SelectModule],
  })
  ```

### Routing
- Use lazy-loaded routes: `loadChildren: () => import('./path/module.routes')`
- Protected routes use `AuthGuard` and `NoAuthGuard` from `src/app/core/auth/guards/`
- Initial data loaded via `initialDataResolver` for authenticated routes

### Theming
- **Dual theming system**: Tailwind themes (defined in `tailwind.config.js`) + PrimeNG themes
- Theme switching handled by `PrimeNgThemeService` which syncs with `FuseConfigService`
- Dark mode applied via `html.dark` class selector
- Custom color palettes generated via `generatePalette()` helper in Tailwind config

### Service Patterns
- Services use `providedIn: 'root'` for tree-shakable providers
- State management via RxJS: `BehaviorSubject` → `asObservable()` pattern (see `FuseConfigService`)
- HTTP calls return observables - use `.pipe(tap())` to update internal state

### Mock API Development
- Create mock API handlers in `src/app/mock-api/` following existing patterns
- Register in `src/app/mock-api/index.ts` → `mockApiServices` array
- Handlers auto-register GET/POST/PATCH/DELETE via `FuseMockApiService.onGet()`, etc.
- URL patterns support parameters: `/api/users/:id` → extracted in `urlParams`

### Navigation
- Navigation structure loaded from Mock API: `api/common/navigation`
- Define navigation items following `FuseNavigationItem` type structure
- Vertical navigation has collapsible groups, horizontal has dropdowns
- Navigation service: `src/@fuse/components/navigation/navigation.service.ts`

### Styling
- **SCSS modules**: Component styles use `@import` from `src/@fuse/styles/` (path included in preprocessor options)
- **Tailwind utilities**: Use custom `@fuse` Tailwind plugins in `src/@fuse/tailwind/plugins/`
- **PrimeNG theming**: Customize via `FusePrimePreset` in `src/app/core/primeng/fuse-primeng.preset.ts`

## Integration Points

### Authentication Flow
- Auth provider in `src/app/core/auth/auth.provider.ts` registers `authInterceptor`
- Sign-in redirects to `signed-in-redirect` path → then to actual destination (see `app.routes.ts`)
- Token handling and session management in `AuthService`

### Icons
- Custom icon registration via `provideIcons()` in `src/app/core/icons/icons.provider.ts`
- PrimeIcons available globally

### Transloco Integration
- Translation files: `src/assets/i18n/{en,tr}.json`
- Loaded via `TranslocoHttpLoader` custom loader
- Service initialized in `app.config.ts` with default language preload

## Common Patterns

### Adding a New Module
1. Create under `src/app/modules/admin/` or `src/app/modules/auth/`
2. Define routes file: `module.routes.ts` with `Route[]` export
3. Add lazy route in `app.routes.ts`: `{path: 'module', loadChildren: () => import('./modules/admin/module/module.routes')}`
4. Use `LayoutComponent` wrapper with appropriate `data.layout` value

### Modifying Layouts
- Layout components in `src/app/layout/layouts/`
- Common components (header, footer, settings) in `src/app/layout/common/`
- Layout selected via `FuseConfigService.config$.layout`

### Configuration Changes
- Update `FuseConfig` in `app.config.ts` → `provideFuse({ fuse: {...} })`
- Runtime changes: Inject `FuseConfigService` and update via setter
- Available options: `layout`, `scheme`, `theme`, `screens` (breakpoints)

## Important File Locations

- **Main config**: `src/app/app.config.ts`
- **Routes**: `src/app/app.routes.ts`
- **Fuse core**: `src/@fuse/` (treat as library code)
- **Tailwind config**: `tailwind.config.js` (defines themes/palettes)
- **Style entry**: `src/styles/styles.scss`
- **Mock data**: `src/app/mock-api/`
