<style>

:root{

    /* background */

    --ss-bg-primary: white;
    --ss-bg-secondary: #464C55;

    /* text */

    --ss-text-primary: black;
    --ss-text-secondary: #8B8B8B;
    --ss-text-light: #9F9F9F;
    --ss-text-link: #4183C4;
    --ss-text-link-hover: #306EA8;

    /* borders */

    --ss-input-border: #C0C0C0;

    /* segments */

    --ss-segment-border: rgba(34, 36, 38, .15);
    --ss-segment-box-shadow: var(--ss-segment-border);

    --ss-segment-primary: white;
    --ss-segment-secondary: white;

    /* normal button */

    --ss-button-bg: #E0E1E2; 
    --ss-button-label-bg: #D5D6D7; 
    --ss-button-text: #5A5A5A;

    --ss-button-bg-hover: #CACBCD;
    --ss-button-label-bg-hover: #C0C1C3;
    --ss-button-text-hover: #282929;

    /* special buttons */

    --ss-button-primary-bg: #2185d0;
    --ss-button-primary-text: white;
    --ss-button-primary-bg-hover: #1E77BA;

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

    --ss-table-text: black;

    --ss-table-header-bg: #F9FAFB;
    --ss-table-cell-bg: white;
    --ss-table-cell-bg-hover: #F2F2F2;

    /* modals */

    --ss-modal-text: var(--ss-text-primary);
    --ss-modal-header-bg: white;
    --ss-modal-content-bg: white;
    --ss-modal-actions-bg: #F9FAFB;

    /* cards */

    --ss-card-bg: white;
    --ss-card-bg-hover: white;

    /* menu */

    --ss-menu-bg-hover: #F2F2F2;
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

/* Backgrounds */

.ss-bg-primary{ background-color: var(--ss-bg-primary) !important; }
.ss-bg-secondary{ background-color: var(--ss-bg-secondary) !important; }

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

/* Tables */

table.table{ color: var(--ss-table-text) !important; }
table.table thead tr th{ background-color: var(--ss-table-header-bg) !important; }
table.table tbody tr td{ background-color: var(--ss-table-cell-bg) !important; }
table.table tbody tr:hover td{ background-color: var(--ss-table-cell-bg-hover) !important; }

/* Inputs, Textareas, Checkboxes */

input::placeholder, textarea::placeholder{ color: var(--ss-text-light) !important; }
input, textarea{ color: var(--ss-text-primary) !important; border-color: var(--ss-input-border) !important; background: "none" !important; }
div.checkbox label{ color: var(--ss-text-primary) !important; }

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
.ss-header-icon{ color: var(--ss-bg-primary) !important; }
.ss-header-dropdown{ background-color: var(--ss-bg-primary) !important; }
.ss-header-dropdown .item span.text{ color: var(--ss-bg-secondary) !important; }
.ss-header-dropdown .item:hover{ background-color: var(--ss-menu-bg-hover) !important; }

/* Landing page */

.ss-instructions-container, .ss-instructions-location{ align-content: center !important; }
.ss-instructions-button{ margin-top: 15px !important; }

.ss-title-title{ color: var(--ss-text-light); font-size: 70px; }
.ss-title-logo{ margin-right: 10px !important; margin-top: 0px !important; padding-bottom: 25px; }
.ss-title-header{ padding-top: 50px !important; }
.ss-title-subtitle{ font-size: 20px; color: var(--ss-text-secondary); padding-bottom: 10px; }

/* Info Page */

.ss-info-menu{ color: var(--ss-text-primary) !important; }
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

.ss-card{ background-color: var(--ss-card-bg) !important; }
.ss-card:hover{ background-color: var(--ss-card-bg-hover) !important; }

</style>