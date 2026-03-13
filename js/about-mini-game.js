(function () {
  'use strict';

  var chips = Array.prototype.slice.call(document.querySelectorAll('.about-decoder-chip'));
  var status = document.getElementById('about-decoder-status');
  var resetBtn = document.getElementById('about-decoder-reset');
  var rewardClaimed = false;
  var PUZZLE_REWARD = 5;

  if (!chips.length || !status || !resetBtn) return;

  function getRewardPopupPosition() {
    var anchor = status || chips[chips.length - 1];
    if (!anchor) return null;

    var rect = anchor.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  function updateStatus() {
    var decodedCount = chips.filter(function (chip) {
      return chip.classList.contains('is-decoded');
    }).length;

    if (decodedCount === chips.length) {
      if (!rewardClaimed && window.PortfolioScore && typeof window.PortfolioScore.add === 'function') {
        window.PortfolioScore.add(PUZZLE_REWARD, getRewardPopupPosition());
        rewardClaimed = true;
      }

      status.textContent = rewardClaimed
        ? '[ PROFILE_LOCKED_IN :: +5 SCORE ]'
        : '[ PROFILE_LOCKED_IN :: READY_TO_BUILD ]';
      return;
    }

    status.textContent = '[ ' + decodedCount + ' / ' + chips.length + ' TRAITS_DECODED ]';
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      if (chip.classList.contains('is-decoded')) return;

      var reveal = chip.getAttribute('data-reveal');
      if (!reveal) return;

      chip.textContent = '> ' + reveal.toUpperCase();
      chip.classList.add('is-decoded');

      if (window.SFX && typeof window.SFX.play === 'function') {
        window.SFX.play('tap');
      }

      updateStatus();
    });
  });

  resetBtn.addEventListener('click', function () {
    chips.forEach(function (chip) {
      var defaultLabel = chip.getAttribute('data-default-label');
      if (defaultLabel) {
        chip.textContent = defaultLabel;
      }
      chip.classList.remove('is-decoded');
    });

    if (window.SFX && typeof window.SFX.play === 'function') {
      window.SFX.play('click');
    }

    updateStatus();
  });

  chips.forEach(function (chip) {
    chip.setAttribute('data-default-label', chip.textContent);
  });

  updateStatus();
})();
