import { GoogleCredentials, GoogleOneTapController, googleCtrl } from './GoogleOneTap';


export class LoginModal {
    public googleCtrl:GoogleOneTapController = googleCtrl;
    public modalElement: HTMLDivElement = document.createElement('div');
    subEvm: void | undefined;
    subZero: void | undefined;
    evmButton: Element | null = null;
    zeroButton: Element | null = null;
    chainSelected = 'evm';

    constructor() {
        console.log("LoginModal.constructor()");
        this.createModal();
    }

    private createModal() {
        console.log("LoginModal.createModal()");
        this.modalElement = this.createModalElement();
        document.body.appendChild(this.modalElement);
        this.addEventListeners();
    }

    createModalElement(): HTMLDivElement {
        console.log("LoginModal.createModalElement()");
        const modalElement = this.modalElement || document.createElement('div');
        modalElement.id = 'telos-modal';
        modalElement.style.display = 'none';
        modalElement.innerHTML = `
            <div class="c-telos-js__modal">
                <div class="c-telos-js__modal-content">
                    <h1 class="c-telos-js__login-title">Telos Cloud Login</h1>
                    <div class="c-telos-js__chain-buttons">
                        <button class="c-telos-js__chain-evm c-telos-js__chain-evm--selected" id="telos-evm">Telos EVM</button>
                        <button class="c-telos-js__chain-zero" id="telos-zero">Telos Zero</button>
                    </div>
                    <div class="c-login-buttons__google-btn" id="google_btn" data-client_id="${googleCtrl.clientId}">
                        <div id="google_btn_content" class="c-telos-js__loading"></div>
                    </div>
                </div>
            </div>
        `;
        return modalElement;
    }

    destroy() {
        console.log("LoginModal.destroy()");
        this.modalElement.remove();
    }

    addEventListeners() {
        console.log("LoginModal.addEventListeners()");
        const a  = this.modalElement.querySelector('#telos-evm');
        this.evmButton = this.modalElement.querySelector('#telos-evm');
        this.zeroButton = this.modalElement.querySelector('#telos-zero');
        this.evmButton?.addEventListener('click', this.onEvmClicked.bind(this));
        this.zeroButton?.addEventListener('click', this.onZeroClicked.bind(this));
    }

    onEvmClicked() {
        console.log("LoginModal.onEvmClicked()");
        this.evmButton?.classList.add('c-telos-js__chain-evm--selected');
        this.zeroButton?.classList.remove('c-telos-js__chain-zero--selected');
        this.chainSelected = 'evm';
    }

    onZeroClicked() {
        console.log("LoginModal.onZeroClicked()");
        this.zeroButton?.classList.add('c-telos-js__chain-zero--selected');
        this.evmButton?.classList.remove('c-telos-js__chain-evm--selected');
        this.chainSelected = 'zero';
    }

    public show() {
        console.log("LoginModal.show()");
        this.modalElement.style.display = 'block';
        googleCtrl.renderButton();
    }

    public hide() {
        console.log("LoginModal.hide()");
        this.modalElement.style.display = 'none';
    }
}
