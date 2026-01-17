## 🤝 Contributing to Cosmo India Prakashan

Thank you for your interest in contributing to **Cosmo India Prakashan**.
This is a **business-backed, production-grade platform**, not a learning or tutorial project. Contributions are welcome from developers who are comfortable working independently with incomplete abstractions and real-world constraints.

---

## 🧭 Before Contributing

* Read the repository **README.md** carefully.
* Review existing **issues** before starting work.
* Comment on an issue to claim it before submitting a pull request.
* For architectural or system-level changes, open an issue for discussion first.

---

## 🔐 Environment & Configuration

This project uses environment variables for sensitive configuration such as database access, authentication secrets, and payment gateways.

* **No `.env` or `.env.example` file is provided.**
* Contributors are expected to **infer required environment variables from the codebase**.
* Use **your own test credentials** for development.
* Requests for production or business secrets will **not be entertained**.

⚠️ **Never commit secrets, keys, or credentials.**

---

## 🛠️ Contribution Workflow

1. Fork the repository

2. Clone your fork locally

3. Create a feature branch

   ```bash
   git checkout -b feature/short-clear-name
   ```

4. Make focused, well-documented changes

5. Commit with a clear and descriptive message

   ```bash
   git commit -m "Implement persistent order storage after payment verification"
   ```

6. Push your branch and open a Pull Request that includes:

   * Problem statement
   * Solution summary
   * Screenshots or logs (if applicable)

---

## 📌 Code Standards

* Follow existing folder structure and patterns
* Avoid unnecessary refactors
* Keep functions small, readable, and purposeful
* Backend changes must handle edge cases and failures gracefully
* Do not introduce new dependencies without strong justification

---

## 💳 Payments & Security

* Payment verification logic must remain intact
* Signature validation must not be bypassed or weakened
* Any change affecting payments requires a clear technical explanation

---

## 🧪 Testing Expectations

Contributors must test:

* Guest and logged-in user flows
* Successful and failed payment scenarios
* Authentication and authorization boundaries

Pull requests that break existing flows will be rejected.

---

## 📦 Acceptable Contributions

* Bug fixes with clear root-cause analysis
* Missing core features (e.g. order persistence, order tracking)
* Performance, reliability, and security improvements

---

## 🚫 Unacceptable Contributions

* Cosmetic-only changes without functional value
* Hardcoded secrets or credentials
* Large-scale rewrites without prior discussion
* Features that weaken security or business logic

---

## 🧠 First-Time Contributors

Issues labeled **`good first issue`** indicate **limited scope, not reduced expectations**.
Contributors are expected to understand the system before writing code.

---

## 🤝 Code of Conduct

Professional and respectful communication is expected.
Low-effort, careless, or noisy contributions will not be merged.

---

## 🧑‍⚖️ Maintainer Authority

All contributions are subject to review and approval by the project maintainer.

The maintainer reserves the right to:

* Request changes
* Reject pull requests without detailed justification
* Modify or close issues at any time

Business requirements take precedence over community preferences.
Acceptance of a contribution does not imply long-term maintenance or continued inclusion.

---

## 📄 Licensing

By contributing to this repository, you agree that your contributions will be licensed under the same license as the project.

You confirm that you have the right to submit the code you contribute.

---

## 🛑 Support Policy

This repository does not provide free support, setup assistance, or debugging help.

Issues should be used strictly for reporting bugs or proposing improvements, not for personal guidance or troubleshooting.

---

### Final Note

This repository reflects **real production constraints**.
If you are comfortable figuring things out independently and working within strict boundaries, you are welcome here.

---
