<p align="center">
  <img src="https://raw.githubusercontent.com/vapaee/working-proposal-2024--ant-lib/main/img/ant-logo-centcase-small.png" alt="Texto alternativo">
</p>


# Proposal Summary

This proposal aims to develop **Ant**, a configurable typescript library designed to simplify and centralize all necessary code for interacting with the Telos blockchain. This tool will enable developers to focus solely on their applications' specific aspects, delegating the inherent complexity of blockchain communication to **Ant**

Moreover, **Ant** will not be limited to Telos but will support any blockchain within the Antelope family and Ethereum-compatible blockchains (EVM), with a particular emphasis on Telos. For data synchronization, this library will rely heavily on the Telos indexer, but it will also have secondary mechanisms (fallbacks) to ensure minimum support for each network in this ecosystem in case the indexer is down or unavailable for the network.

# About Me

I am a Systems Engineer with over 20 years of experience, dedicated to working with Telos since its inception. I started as an independent developer on this platform, implementing personal projects. However, for the past year and a half, I've been part of the Telos core developers, mainly in the front-end team. My experience with the team has given me a clearer insight into how four different web applications are built and maintained. I've observed that all of them share many similar or the same features, being implemented in a slightly different way. This results in unnecessary duplication of effort.

This experience motivated me to suggest creating this library. The goal is to make our team's job easier and also to provide a useful tool for others. This way, we can draw more developers and new projects to our community.

# Current Situation

From day one, Telos Wallet EVM has incorporated this library as an internal parallel project. With the Telos front-end team, we developed the first version of this library, responsible for all the functionalities offered by this web app today. However, the library remains an internal folder within the project and is not exportable for reuse.

The library currently includes features such as:
- **Tokens**: Reading balances and token transfers.
- **History**: A paginated history of all transactions for an account with preprocessed data.
- **STLOS**: Stake and Unstake, withdraw, and read staking global numbers.
- **WTLOS**: Wrap and Unwrap.
- **Inventory**: Read and transfer collectibles.
- **Allowances**: Read and update asset allowances.
- **Authentication**: Log in and Sign support for various wallet providers (such as MetaMask, WalletConnect, Telos Cloud, etc).

The library is responsible for reading, processing, and synchronizing data with the blockchain, allowing developers to focus on implementing graphic components and just take the processed data from he library for direct display.

# Proposed Improvements

The proposal includes the complete implementation of the **Ant** library in its own GitHub repository, with comprehensive documentation, examples, and unit tests. It will provide coverage for both EVM and Native (Antelope tech). It will be released as a standalone package on npm repositories, allowing it to be integrated into any Vue-based web application. This task will be accomplished in two detailed milestones:

## Milestone 1

The initial goal is to finalize the library's first version, offering complete support for EVM, and to release it as an npm package. This will enable developers to easily incorporate it into their Vue web projects, facilitating seamless interaction with Telos EVM or any compatible blockchain. The library will be designed to be fully customizable.

This is the list of features to be implemented:
- **Config file**: A customizable list of blockchains with their respective data (currency, explorer, URLs, main contracts, etc).
- **Module Manager**: Developers can implement their modules, publish them as npm packages, and make them reusable by others.
- **Multichain support**: Users can maintain multiple connections simultaneously with different accounts and blockchains, keeping data synchronized across all.
- **Source and Docs**: A new independent repository with open-source code and complete documentation.
- **Tests**: Unit tests to test the application and a set of Mocks to facilitate the creation of new tests using this library.
- **NPM package**: publish the first version of the library as a standalone package on npm repositories

I anticipate completing and delivering this initial phase within a month, aiming for a release by the end of January.

## Milestone 2

The second and final part aims to extend the library to cover the native side of the blockchain, ensuring it supports both Telos Zero and Telos EVM or any other compatible blockchain.

In addition, I plan to create a Vue web application template that incorporates this **Ant** library. This template will not only showcase how to utilize the library effectively but also serve as a foundational application for developing new projects on Telos, leveraging both Native and EVM functionalities.


This is the list of features to be implemented:
- **Tokens**: Reading balances and token transfers.
- **History**: A history of all transactions for an account with preprocessed data.
- **Resources**: Updated readings, stake and unstake for CPU & NET, buy and sell RAM.
- **REX**: Complete REX status and user readings, deposits, savings, and withdrawals.
- **Inventory**: Reading the inventory and transferring collectibles.
- **Authentication**: Log in and Sign support for various wallet providers (such as Anchor, Cleos, Wombat, Telos Cloud).

The final delivery, scheduled for early March, will include the fully completed library and a functional example application. Everything with the corresponding complete documentation and unit tests.

## Conclusion

This Ant proposal represents a significant advancement in the efficiency of application development on Telos. By centralizing the effort and standardizing processes, we will not only ease our team's workload but also attract more developers to our community, enhancing innovation and collaboration within the Telos ecosystem
