<style>

:root{

    /* define colors */

    --dark1: #181818;
    --dark2: #414141;

    --blue1: #001B48;
    --blue2: #02457A;
    --blue2-2: #0B5997;
    --blue3: #018ABE;
    --blue4: #97CADB;
    --blue5: #D6E8EE;

    --grey1: #464C55;

    /* background */

    --ss-bg-primary: var(--dark2);
    --ss-bg-secondary: var(--dark1);

    /* text */

    --ss-text-primary: var(--blue5);
    --ss-text-secondary: #91ACB7;
    --ss-text-light: var(--blue5);
    --ss-text-link: var(--blue5);
    --ss-text-link-hover: #306EA8;

    /* input */

    --ss-input-border: var(--blue5);

    /* segments */

    --ss-segment-border: rgba(34, 34, 34, .15);
    --ss-segment-box-shadow: var(--ss-segment-border);

    --ss-segment-primary: var(--ss-bg-secondary);
    --ss-segment-secondary: var(--ss-bg-primary);

    /* normal button */

    --ss-button-bg: var(--blue3); 
    --ss-button-label-bg: var(--blue2-2); 
    --ss-button-text: #5A5A5A;

    --ss-button-bg-hover: var(--blue2);
    --ss-button-label-bg-hover: var(--blue2);
    --ss-button-text-hover: #282929;

    /* special buttons */

    --ss-button-primary-bg: var(--blue2);
    --ss-button-primary-text: white;
    --ss-button-primary-bg-hover: var(--blue4);

    --ss-button-secondary-bg: #1b1c1d;
    --ss-button-secondary-text: white;
    --ss-button-secondary-bg-hover: #2C2D2F;

    --ss-button-positive-bg: #21ba45;
    --ss-button-positive-text: white;
    --ss-button-positive-bg-hover: #1DA63D;

    --ss-button-negative-bg: #db2828;
    --ss-button-negative-text: white;
    --ss-button-negative-bg-hover: #C92323;

    /* tables */

    --ss-table-text: var(--blue5);

    --ss-table-header-bg: var(--ss-bg-primary);
    --ss-table-cell-bg: var(--blue2-2);
    --ss-table-cell-bg-hover: var(--blue3);
    --ss-table-border: var(--ss-bg-secondary);

    /* modals */

    --ss-modal-text: var(--ss-text-primary);
    --ss-modal-header-bg: var(--ss-bg-secondary);
    --ss-modal-content-bg: var(--ss-bg-primary);
    --ss-modal-actions-bg: var(--ss-bg-primary);

    /* cards */

    --ss-card-bg: var(--ss-bg-primary);
    --ss-card-bg-hover: var(--blue2);
    --ss-card-border: var(--ss-bg-secondary);

    /* menu */

    --ss-menu-bg-hover: var(--blue3);
}

/* General */

body{ background-color: var(--ss-bg-primary) !important; }

.no-margin{ margin: 0 !important; }
.no-padding{ padding: 0 !important; }
.hoverable:hover{ cursor: pointer; }
.no-hover:hover{ cursor: default !important; }
.no-resize, .no-resize textarea{ resize: none !important; }
.inline{ display: inline-block !important; }

/* Texts */

.ss-text-primary{ color: var(--ss-text-primary) !important; }
.ss-text-secondary{ color: var(--ss-text-secondary) !important; }
.ss-text-light{ color: var(--ss-text-light) !important; }

.ss-link{ color: var(--ss-text-link) !important; }
.ss-link:hover{ color: var(--ss-text-link-hover) !important; }

/* Buttons */

div[role=button], button.button{ background-color: var(--ss-button-bg) !important; color: var(--ss-button-text); }
.labeled i{ background-color: var(--ss-button-label-bg) !important; }

div[role=button]:hover, button.button:hover{ background-color: var(--ss-button-bg-hover) !important; color: var(--ss-button-text-hover); }
.labeled:hover > i{ background-color: var(--ss-button-label-bg-hover) !important; }

/* Special Buttons */

div[role=button].blue, button.blue, button.primary{ background-color: var(--ss-button-primary-bg) !important; color: var(--ss-button-primary-text);}
div[role=button].blue:hover, button.blue:hover, button.primary:hover{ background-color: var(--ss-button-primary-bg-hover) !important; }

div[role=button].secondary, button.secondary{ background-color: var(--ss-button-secondary-bg) !important; color: var(--ss-button-secondary-text);}
div[role=button].secondary:hover, button.secondary:hover{ background-color: var(--ss-button-secondary-bg-hover) !important; }

div[role=button].green, button.green, button.positive{ background-color: var(--ss-button-positive-bg) !important; color: var(--ss-button-positive-text);}
div[role=button].green:hover, button.green:hover, button.positive:hover{ background-color: var(--ss-button-positive-bg-hover) !important; }

div[role=button].red, button.red, button.negative{ background-color: var(--ss-button-negative-bg) !important; color: var(--ss-button-negative-text);}
div[role=button].red:hover, button.red:hover, button.negative:hover{ background-color: var(--ss-button-negative-bg-hover) !important; }

button.basic, button.basic:hover{ background: none !important; }

/* Segments */

.ss-segment-primary{ background-color: var(--ss-segment-primary) !important; }
.ss-segment-secondary{ background-color: var(--ss-segment-secondary) !important; }
div.segment:not(.basic):not(.tab){
    border: 1px solid var(--ss-segment-border) !important;
    box-shadow: 0px 1px 2px 0px var(--ss-segment-box-shadow) !important;
}

/* Tabs */

.ss-tab .bottom:not(.button){ background-color: var(--ss-bg-primary) !important; }
.ss-tab .active:not(.button){ background-color: var(--ss-bg-primary) !important; }

/* Tables */

table.table{ color: var(--ss-table-text) !important; border-color: var(--ss-table-border) !important; }
table.table thead tr th{ background-color: var(--ss-table-header-bg) !important; color: var(--ss-table-text) !important; }
table.table tbody tr td{ background-color: var(--ss-table-cell-bg) !important; }
table.table tbody tr:hover td{ background-color: var(--ss-table-cell-bg-hover) !important; }

/* Inputs, Textareas, Checkboxes */

input::placeholder, textarea::placeholder{ color: var(--ss-text-light) !important; }
input, textarea{ color: var(--ss-text-primary) !important; border-color: var(--ss-input-border) !important; background-color: rgba(0, 0, 0, 0) !important; }
div.checkbox label, div.field label{ color: var(--ss-text-primary) !important; }

/* Modals */

div.modal .header{ background-color: var(--ss-modal-header-bg) !important; color: var(--ss-modal-text) !important; }
div.modal .content{ background-color: var(--ss-modal-content-bg) !important; color: var(--ss-modal-text) !important; }
div.modal .actions{ background-color: var(--ss-modal-actions-bg) !important; }

/* Tabular Menu */

div.tabular a{ color: var(--ss-text-primary) !important; }

/* Statistic and Rating */

div.statistic .value, div.statistic .label{ color: var(--ss-text-primary) !important; }
div.rating i{ color: var(--ss-text-primary) !important; }

/* Header */

@media(max-width: 520px){
    .ss-header{ min-width: 395px; }
}
.ss-header{
    background-color: var(--ss-bg-secondary) !important;
    border-radius: 0 !important;
    margin-top: 0 !important;
    display:flex;
    align-items: center;
    justify-content: space-between;
}
.ss-header-searchbar{  padding-left: 12px !important;  display: inline-block;  }
.ss-header-searchbar input{ background-color: var(--ss-bg-primary) !important; color: var(--ss-text-primary); }
.ss-header-searchbar i{ color: var(--ss-text-light); }
.ss-header-icon{ color: white !important; }
.ss-header-dropdown{ background-color: var(--blue5) !important; }
.ss-header-dropdown .item span.text{ color: var(--ss-bg-secondary) !important; }
.ss-header-dropdown .item:hover{ background-color: var(--ss-menu-bg-hover) !important; }

/* Landing page */

.ss-instructions-container, .ss-instructions-location{ align-content: center !important; }
.ss-instructions-button{ margin-top: 15px !important; }

.ss-title-logo{ margin-right: 10px !important; margin-top: 0px !important; padding-bottom: 25px; }
.ss-title-header{ padding-top: 50px !important; }
.ss-title-subtitle{ font-size: 20px; color: var(--ss-text-secondary); padding-bottom: 10px; }

/* Info Page */

.ss-info-menu{ color: var(--ss-text-primary) !important; }
.ss-info-menu .item{ color: var(--ss-text-primary) !important; }
.ss-info-menu a.item:hover{ background-color: var(--ss-menu-bg-hover) !important; }
.ss-info-menu a.active{ background-color: var(--ss-menu-bg-hover) !important; }

/* Set View */

.padded-cell-button{ padding: 11px !important; }
.basic-button{
    margin: 0 !important;
    padding: 0 !important;
    background: none !important;
    border: none !important;
}

/* Card */

.ss-card{ background-color: var(--ss-card-bg) !important; box-shadow: 0 1px 3px 0 var(--ss-card-border), 0 0 0 1px var(--ss-card-border) !important; }
.ss-card:hover{ background-color: var(--ss-card-bg-hover) !important; }

</style>